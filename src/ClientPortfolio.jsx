import React, { useEffect, useState } from "react";
import Portfolio from "./Portfolio.jsx";
import {
  ArrowRight, Braces, Check, Code2, Database, Github, Layers3,
  LockKeyhole, LogOut, Mail, Menu, Pencil, Plus, ServerCog,
  Sparkles, Trash2, Upload, X, Zap, Moon,
} from "lucide-react";

const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "owner@arwinmadeja.dev";
const OWNER_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || "portfolio2026";
const STORAGE_KEY = "arwin-portfolio-projects-v2";
const EMPTY = { title: "", category: "", description: "", outcome: "", stack: "", image: "" };

const FEATURED = {
  id: "soilution",
  title: "SOILution",
  category: "IoT & Machine Learning",
  description: "An intelligent soil analysis platform that turns live sensor readings into practical crop recommendations using a Multi-Layer Perceptron.",
  outcome: "Connected field sensors, an ML pipeline, and a web dashboard into one decision-support system.",
  stack: ["Django", "TensorFlow", "Python", "Supabase", "Tailwind CSS"],
  image: "",
};

const DEFAULT_PROJECTS = [FEATURED];

const SERVICES = [
  [ServerCog, "Backend development", "Reliable APIs, authentication, database design, and integrations built around real product requirements."],
  [Database, "Data-driven systems", "PostgreSQL applications, event-driven services, and clean data pipelines that remain maintainable."],
  [Zap, "IoT & ML integration", "Hardware, sensor data, and machine-learning models brought together in practical web experiences."],
];

const STACK = ["Node.js", "Express.js", "PostgreSQL", "Apache Kafka", "Django", "Python", "TensorFlow", "React", "Supabase", "Podman", "Git", "REST APIs"];

function loadProjects() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(value)) return [...DEFAULT_PROJECTS];
    return value.length ? value : [...DEFAULT_PROJECTS];
  } catch { return []; }
}

function ProjectCard({ project, index }) {
  return <article className="project-card">
    <div className="project-image">
      {project.image
        ? <img src={project.image} alt={`${project.title} preview`} />
        : <div className={`project-fallback color-${index % 3}`}><b>{String(index + 1).padStart(2, "0")}</b><Braces size={40} /></div>}
      <span>{project.category}</span>
    </div>
    <div className="project-copy">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.outcome && <div className="result"><Check size={15} />{project.outcome}</div>}
      <div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
    </div>
  </article>;
}

function Login({ close, success }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = e => {
    e.preventDefault();
    if (form.email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() && form.password === OWNER_PASSWORD) success();
    else setError("Those credentials do not match the owner account.");
  };
  return <div className="overlay">
    <form className="login" onSubmit={submit}>
      <button className="close" type="button" onClick={close} aria-label="Close"><X /></button>
      <div className="lock"><LockKeyhole /></div>
      <small>PRIVATE ACCESS</small><h2>Owner sign in</h2>
      <p>Sign in to create, edit, and delete portfolio projects.</p>
      <label>Email address<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} autoComplete="username" required autoFocus /></label>
      <label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} autoComplete="current-password" required /></label>
      {error && <div className="error" role="alert">{error}</div>}
      <button className="primary" type="submit">Open project manager <ArrowRight size={16}/></button>
    </form>
  </div>;
}

function Manager({ projects, save, remove, close }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [notice, setNotice] = useState("");

  const change = key => e => setForm({...form, [key]:e.target.value});
  const edit = p => { setEditing(p.id); setForm({...p, stack:p.stack.join(", ")}); setNotice(""); };
  const reset = () => { setEditing(null); setForm(EMPTY); setNotice(""); };
  const image = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1.5 * 1024 * 1024) return setNotice("Choose an image smaller than 1.5 MB.");
    const reader = new FileReader();
    reader.onload = () => setForm(current => ({...current, image:reader.result}));
    reader.readAsDataURL(file);
  };
  const submit = e => {
    e.preventDefault();
    const item = {...form, id:editing || crypto.randomUUID(), stack:form.stack.split(",").map(x=>x.trim()).filter(Boolean)};
    if (save(item, editing)) { reset(); setNotice(editing ? "Project updated." : "Project added."); }
    else setNotice("The selected image is too large to save.");
  };

  return <div className="overlay manager-overlay"><div className="manager">
    <header><div><small>OWNER WORKSPACE</small><h2>Manage projects</h2></div><button className="quiet" onClick={close}><LogOut size={15}/> Lock</button><button className="close" onClick={close}><X/></button></header>
    <div className="manager-grid">
      <aside><div className="aside-title"><span>Published projects</span><b>{projects.length}</b></div>
        {projects.length === 0 ? <div className="empty"><Layers3/><p>No custom projects yet.</p><span>Add your first one using the editor.</span></div>
        : <div className="project-list">{projects.map(p=><div className="project-row" key={p.id}>
            <div>{p.image ? <img src={p.image} alt=""/> : <Code2/>}</div>
            <span><b>{p.title}</b><small>{p.category}</small></span>
            <button onClick={()=>edit(p)} aria-label={`Edit ${p.title}`}><Pencil/></button>
            <button className="danger" onClick={()=>remove(p.id)} aria-label={`Delete ${p.title}`}><Trash2/></button>
          </div>)}</div>}
      </aside>
      <form className="editor" onSubmit={submit}>
        <div className="editor-title"><div><small>{editing ? "UPDATE ENTRY" : "NEW ENTRY"}</small><h3>{editing ? "Edit project" : "Add a project"}</h3></div>{editing&&<button type="button" onClick={reset}>Cancel edit</button>}</div>
        <div className="two-fields">
          <label>Project title<input value={form.title} onChange={change("title")} placeholder="Smart Inventory API" required/></label>
          <label>Category<input value={form.category} onChange={change("category")} placeholder="Backend system" required/></label>
        </div>
        <label>Description<textarea value={form.description} onChange={change("description")} placeholder="Explain the problem, your solution, and why it matters." rows="4" required/></label>
        <label>Outcome or contribution<input value={form.outcome} onChange={change("outcome")} placeholder="Reduced processing time and simplified operations."/></label>
        <label>Tech stack<input value={form.stack} onChange={change("stack")} placeholder="Node.js, PostgreSQL, React" required/><small>Separate technologies with commas.</small></label>
        <label className="upload"><input type="file" accept="image/*" onChange={image}/>{form.image?<img src={form.image} alt="Preview"/>:<Upload/>}<span>{form.image?"Change project image":"Upload a project image"}</span><small>JPG, PNG, WebP or GIF · max 1.5 MB</small></label>
        {notice&&<div className="notice">{notice}</div>}
        <button className="primary submit" type="submit">{editing?<><Check/> Save changes</>:<><Plus/> Add project</>}</button>
      </form>
    </div>
  </div></div>;
}

export default function ClientPortfolio() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [manager, setManager] = useState(false);
  const [showResume, setShowResume] = useState(false);
  useEffect(()=>setProjects(loadProjects()),[]);
  useEffect(()=>{ document.body.style.overflow=login||manager?"hidden":""; return()=>document.body.style.overflow=""; },[login,manager]);

  const persist = next => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); setProjects(next); return true; } catch { return false; } };
  const save = (p,id) => persist(id ? projects.map(x=>x.id===id?p:x) : [p,...projects]);
  const remove = id => { if (confirm("Delete this project? This cannot be undone.")) persist(projects.filter(p=>p.id!==id)); };
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenu(false); };

  const GlobalStyles = () => (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

:root{--bg:#08001f;--bg-soft:#12063d;--panel:#1a0b4b;--panel-2:#27106b;--text:#f8f4ff;--muted:#c2b6e8;--dim:#8175b2;--teal:#77f3ff;--teal-dark:#397fd0;--gold:#ff55d6;--red:#ff7aab;--line:rgba(119,243,255,.24);--shadow:0 24px 70px rgba(0,0,0,.5);--mono:'JetBrains Mono',monospace;--display:'Space Grotesk',sans-serif;--body:'DM Sans',sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);font-family:var(--body);color:var(--text)}
button,input,textarea{font:inherit}
button,a{cursor:pointer}
button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.site{min-height:100vh;padding:22px;background:radial-gradient(circle at 50% 0%,rgba(93,31,255,.45),transparent 38%),radial-gradient(circle at 100% 35%,rgba(255,53,214,.15),transparent 30%),var(--bg)}
.window-frame{width:100%;max-width:1240px;margin:auto;background:linear-gradient(180deg,rgba(20,7,63,.96),rgba(8,0,31,.98));border:1px solid var(--line);box-shadow:var(--shadow),0 0 45px rgba(70,24,230,.22);position:relative;overflow:hidden}
.window-frame:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:46px 46px;mask-image:linear-gradient(to bottom,black,transparent 55%)}
.site>nav,.main,.page-footer{position:relative;z-index:1}
.site>nav{height:74px;padding:0 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:12px;border:0;background:none;color:var(--text);padding:0;text-align:left}
.brand span{width:40px;height:40px;display:grid;place-items:center;border:1px solid var(--teal-dark);background:var(--panel-2);color:var(--teal);font:700 14px var(--mono)}
.brand b{font:600 15px var(--display);letter-spacing:.02em}
.links{display:flex;align-items:center;gap:3px}.links button{background:none;border:0;color:var(--muted);padding:9px 11px;font:500 11px var(--mono);text-transform:uppercase;letter-spacing:.04em}.links button:hover{color:var(--teal);background:rgba(119,214,189,.08)}
.owner{display:flex!important;align-items:center;gap:7px;margin-left:10px;border:1px solid var(--gold)!important;color:var(--gold)!important}.owner svg{width:15px}
.menu{display:none;background:none;border:0;color:var(--text);padding:8px}
.hero{max-width:1120px;min-height:610px;margin:auto;padding:86px 52px 74px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:60px}
.available{display:inline-flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid var(--teal-dark);color:var(--teal);font:600 10px var(--mono);text-transform:uppercase;letter-spacing:.07em;background:rgba(44,42,170,.25);box-shadow:0 0 18px rgba(119,243,255,.12)}.available i{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 0 4px rgba(119,243,255,.12),0 0 12px var(--teal)}
.hero h1{max-width:650px;margin:24px 0 20px;font:700 clamp(3rem,7vw,6.5rem)/.95 var(--display);letter-spacing:-.03em;text-shadow:0 0 28px rgba(107,41,255,.4)}.hero h1 em{color:var(--gold);font-style:normal;text-shadow:0 0 24px rgba(255,85,214,.65)}.hero p{max-width:540px;color:var(--muted);font-size:17px;line-height:1.7}
.actions{display:flex;align-items:center;gap:20px;margin-top:32px}.actions a,.about a{color:var(--teal);font-weight:600;text-decoration:none}.actions a:hover,.about a:hover{color:var(--gold)}
.primary{display:inline-flex;align-items:center;justify-content:center;gap:9px;border:1px solid var(--teal);background:linear-gradient(135deg,#56e9ff,#4f8dff);color:#10052e;padding:12px 16px;font-weight:700;box-shadow:0 0 18px rgba(74,193,255,.35)}.primary:hover{background:linear-gradient(135deg,#ff55d6,#845dff);border-color:#ffb8ed;color:white}.primary svg{width:17px}
.trust{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:54px;color:var(--dim);font:500 10px var(--mono);text-transform:uppercase}.trust b{padding:5px 8px;border:1px solid var(--line);color:var(--muted);font-weight:400;text-transform:none}
.hero-art{position:relative;min-height:370px;display:grid;place-items:center}.orbit{position:absolute;border:1px solid rgba(119,214,189,.25);border-radius:50%;transform:rotate(-18deg)}.orbit.one{width:380px;height:220px}.orbit.two{width:220px;height:380px;border-color:rgba(239,173,113,.25);transform:rotate(32deg)}
.code-card{width:min(100%,360px);position:relative;border:1px solid var(--line);background:rgba(17,35,38,.95);box-shadow:0 22px 45px rgba(0,0,0,.36)}.code-card header{height:38px;display:flex;align-items:center;gap:6px;padding:0 13px;border-bottom:1px solid var(--line);color:var(--dim);font:10px var(--mono)}.code-card header i{width:7px;height:7px;border-radius:50%;background:var(--red)}.code-card header i:nth-child(2){background:var(--gold)}.code-card header i:nth-child(3){background:var(--teal)}.code-card header span{margin-left:auto}.code-card pre{margin:0;padding:24px 22px;color:var(--muted);font:13px/2 var(--mono)}.code-card pre b{color:var(--gold)}.code-card mark{background:none;color:var(--teal)}.code-card q{color:#d6a7d3}.code-card footer{display:flex;justify-content:space-between;padding:11px 14px;border-top:1px solid var(--line);color:var(--dim);font:10px var(--mono)}.code-card footer span:first-child{display:flex;gap:6px;align-items:center;color:var(--teal)}.code-card footer svg{width:14px}
.float{position:absolute;display:flex;align-items:center;gap:7px;padding:9px 11px;border:1px solid var(--line);background:rgba(13,26,29,.94);color:var(--muted);font:11px var(--mono);box-shadow:0 10px 26px rgba(0,0,0,.2)}.float svg{width:15px;color:var(--gold)}.f1{right:0;top:22%}.f2{left:0;bottom:18%}.section{max-width:1120px;margin:auto;padding:84px 52px;border-top:1px solid var(--line)}.heading{display:flex;justify-content:space-between;gap:35px;align-items:end;margin-bottom:32px}.heading small,.about>div>small,.contact small{color:var(--gold);font:600 10px var(--mono);letter-spacing:.12em;text-transform:uppercase}.heading h2,.about h2,.contact h2{max-width:620px;margin:10px 0 0;font:600 clamp(2rem,4vw,3.3rem)/1.05 var(--display);letter-spacing:-.02em}.heading>p{max-width:380px;color:var(--muted);line-height:1.65;margin:0}.projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.project-card{background:var(--panel);border:1px solid var(--line);box-shadow:0 12px 28px rgba(0,0,0,.2)}.project-image{height:190px;position:relative;overflow:hidden;border-bottom:1px solid var(--line)}.project-image>span{position:absolute;left:14px;bottom:14px;padding:5px 8px;background:rgba(8,17,20,.82);border:1px solid var(--line);color:var(--teal);font:10px var(--mono);text-transform:uppercase}.project-fallback{height:100%;display:flex;align-items:center;justify-content:space-between;padding:24px;background:linear-gradient(135deg,#173c3d,#1a2929)}.project-fallback b{color:rgba(237,245,242,.25);font:700 80px var(--display)}.project-fallback svg{color:var(--gold);opacity:.7}.project-fallback.color-1{background:linear-gradient(135deg,#352b23,#173436)}.project-fallback.color-2{background:linear-gradient(135deg,#1f3042,#12302c)}.project-image img{width:100%;height:100%;object-fit:cover}.project-copy{padding:22px}.project-copy h3{margin:0 0 10px;font:600 24px var(--display)}.project-copy p{color:var(--muted);line-height:1.6;margin:0}.result{display:flex;align-items:flex-start;gap:7px;margin:18px 0;color:var(--teal);font-size:13px;line-height:1.5}.result svg{flex:none;margin-top:2px}.tags,.stack{display:flex;flex-wrap:wrap;gap:7px}.tags span,.stack span{padding:5px 8px;border:1px solid var(--line);color:var(--muted);font:10px var(--mono)}.services{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.services article,.about aside{background:var(--panel);border:1px solid var(--line);padding:22px}.services article header{display:flex;justify-content:space-between;color:var(--teal);font:12px var(--mono)}.services article header svg{width:20px}.services h3{margin:42px 0 10px;font:600 20px var(--display)}.services p{color:var(--muted);line-height:1.6}.about{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:start}.about h2{margin:15px 0 20px}.about p{max-width:580px;color:var(--muted);line-height:1.7;margin:0 0 14px}.about a{display:inline-flex;align-items:center;gap:8px;margin-top:12px}.about a svg{width:16px}.about aside header{display:flex;justify-content:space-between;color:var(--teal);font:600 13px var(--mono);margin-bottom:20px}.about aside header svg{width:18px}.about aside footer{display:flex;gap:12px;align-items:center;margin-top:26px;padding-top:16px;border-top:1px solid var(--line);font-size:12px}.about aside footer b{color:var(--gold);font:600 13px var(--mono)}.about aside footer span{color:var(--muted)}.contact{max-width:1120px;margin:auto;padding:84px 52px 96px;text-align:center;border-top:1px solid var(--line)}.contact h2{margin:14px auto}.contact p{max-width:480px;margin:0 auto;color:var(--muted);line-height:1.6}.contact>div{display:flex;justify-content:center;flex-wrap:wrap;gap:18px;margin-top:28px}.contact a{display:inline-flex;align-items:center;gap:8px;color:var(--teal);font-weight:600}.contact a:hover{color:var(--gold)}.contact svg{width:16px}.page-footer{max-width:1120px;margin:auto;padding:22px 52px;border-top:1px solid var(--line);display:flex;justify-content:space-between;color:var(--dim);font:10px var(--mono);text-transform:uppercase;letter-spacing:.05em}.page-footer b{color:var(--teal)}
.overlay{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:20px;background:rgba(3,9,11,.82);backdrop-filter:blur(8px)}.login{position:relative;width:min(100%,430px);padding:32px;background:var(--panel);border:1px solid var(--line);box-shadow:var(--shadow)}.login .close,.manager .close{position:absolute;right:16px;top:16px;border:0;background:none;color:var(--muted)}.login .lock{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--gold);color:var(--gold);margin-bottom:22px}.login small,.manager small,.editor-title small{color:var(--gold);font:600 10px var(--mono);letter-spacing:.1em}.login h2,.manager h2{margin:8px 0;font:600 28px var(--display)}.login p{color:var(--muted);line-height:1.5}.login label,.editor label{display:grid;gap:7px;margin-top:18px;color:var(--muted);font-size:13px}.login input,.editor input,.editor textarea{width:100%;border:1px solid var(--line);background:var(--bg-soft);color:var(--text);padding:11px}.error,.notice{margin-top:14px;padding:10px;border:1px solid rgba(239,118,109,.45);color:#ffaaa3;font-size:13px}.login .primary{width:100%;margin-top:22px}.manager-overlay{overflow:auto}.manager{width:min(100%,1080px);max-height:calc(100vh - 40px);overflow:auto;background:var(--bg-soft);border:1px solid var(--line);box-shadow:var(--shadow);padding:28px}.manager>header{display:flex;align-items:center;gap:10px;padding-bottom:24px;border-bottom:1px solid var(--line)}.manager>header>div{margin-right:auto}.manager>header .close{position:static}.quiet,.editor-title button{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--line);color:var(--muted);padding:8px 11px}.manager-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:22px;padding-top:22px}.manager-grid aside,.editor{border:1px solid var(--line);background:var(--panel);padding:18px}.aside-title,.editor-title{display:flex;justify-content:space-between;align-items:start;color:var(--muted);font:12px var(--mono)}.aside-title b{color:var(--gold)}.project-list{display:grid;gap:9px;margin-top:18px}.project-row{display:grid;grid-template-columns:38px 1fr auto auto;align-items:center;gap:9px;padding:9px;border:1px solid var(--line)}.project-row>div{width:38px;height:38px;display:grid;place-items:center;background:var(--bg-soft);color:var(--teal);overflow:hidden}.project-row img{width:100%;height:100%;object-fit:cover}.project-row span{display:grid;gap:4px;min-width:0}.project-row b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text)}.project-row small{color:var(--dim)}.project-row button{border:0;background:none;color:var(--muted);padding:5px}.project-row button:hover{color:var(--teal)}.project-row .danger:hover{color:var(--red)}.two-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px}.editor-title{margin-bottom:20px}.editor-title h3{margin:7px 0 0;color:var(--text);font:600 22px var(--display)}.editor textarea{resize:vertical}.editor label small{color:var(--dim);font:10px var(--mono)}.upload{display:grid!important;grid-template-columns:auto 1fr;align-items:center;column-gap:10px;padding:14px;border:1px dashed var(--line);cursor:pointer}.upload input{display:none}.upload svg{color:var(--teal)}.upload img{width:34px;height:34px;object-fit:cover}.upload span{color:var(--text)}.upload small{grid-column:2}.submit{width:100%;margin-top:20px}.empty{text-align:center;color:var(--muted);padding:35px 10px}.empty svg{color:var(--gold)}.empty span{font-size:12px}.add-prompt{display:flex;justify-content:space-between;gap:15px;align-items:center;margin-top:16px;padding:14px;border:1px solid var(--line);color:var(--muted)}.add-prompt span{display:flex;align-items:center;gap:8px}.add-prompt svg{color:var(--gold)}.add-prompt button{display:flex;align-items:center;gap:6px;border:0;background:none;color:var(--teal)}
@media(max-width:900px){.hero{grid-template-columns:1fr;gap:30px;padding-top:56px}.hero-art{min-height:320px}.heading{display:block}.heading>p{margin-top:16px}.about{grid-template-columns:1fr}.manager-grid{grid-template-columns:1fr}}
@media(max-width:680px){.site{padding:0}.window-frame{border-left:0;border-right:0}.site>nav{height:66px;padding:0 16px}.links{display:none;position:absolute;left:16px;right:16px;top:70px;padding:10px;background:var(--panel);border:1px solid var(--line);box-shadow:var(--shadow);flex-direction:column;align-items:stretch}.links.open{display:flex}.links button{padding:12px;text-align:left}.owner{margin-left:0}.menu{display:block}.hero,.section,.contact{padding-left:20px;padding-right:20px}.hero{min-height:auto;padding-top:60px}.hero h1{font-size:clamp(2.8rem,14vw,4rem)}.hero p{font-size:15px}.actions{align-items:stretch;flex-direction:column;gap:14px}.actions a{text-align:center}.hero-art{min-height:290px}.orbit.one{width:290px;height:170px}.orbit.two{width:170px;height:290px}.float{font-size:10px}.f1{right:-4px}.f2{left:-4px}.trust{margin-top:34px}.projects,.services{grid-template-columns:1fr}.project-image{height:170px}.about h2,.contact h2{font-size:2.3rem}.page-footer{padding:20px;gap:8px;flex-direction:column}.two-fields{grid-template-columns:1fr}.manager{padding:18px}.manager-grid{gap:14px}.add-prompt{align-items:flex-start;flex-direction:column}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}
    `}</style>
  );
  
  return <div className="site"><GlobalStyles/>
    <div className="window-frame">
    <nav><button className="brand" onClick={()=>{ setShowResume(false); go("home"); }}><span>AM</span><b>Arwin Madeja</b></button>
      <div className={`links ${menu?"open":""}`}><button onClick={()=>go("work")}>Work</button><button onClick={()=>go("services")}>Services</button><button onClick={()=>go("about")}>About</button><button onClick={()=>go("contact")}>Contact</button><button onClick={()=>{ setShowResume(true); setMenu(false); }}>Resume</button><button className="owner" onClick={()=>setLogin(true)}><LockKeyhole/> Owner</button></div>
      <button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </nav>
    {showResume ? <Portfolio/> : <main>
      <section id="home" className="hero"><div className="hero-copy">
        <div className="available"><i/> Available for freelance projects/Employment</div>
        <h1>Your <em>Frontend's</em> favorite Backend.</h1>
        <p>Backend developer focused on dependable APIs, data-driven platforms, and IoT solutions that solve practical business problems.</p>
        <div className="actions"><button className="primary" onClick={()=>go("work")}>Explore my work <ArrowRight/></button><a href="mailto:rwinmadeja@gmail.com">Start a conversation</a></div>
        <div className="trust"><span>BUILDING WITH</span><b>Node.js</b><b>PostgreSQL</b><b>Python</b><b>React</b></div>
      </div><div className="hero-art"><div className="orbit one"/><div className="orbit two"/><div className="code-card"><header><i/><i/><i/><span>system.ts</span></header><pre><b>const</b> solution = {"{"}<br/>  reliable: <mark>true</mark>,<br/>  scalable: <mark>true</mark>,<br/>  builtFor: <q>"impact"</q><br/>{"}"};</pre><footer><span><Check/> API online</span><span>24ms</span></footer></div><div className="float f1"><Database/> PostgreSQL</div><div className="float f2"><Sparkles/> ML ready</div></div></section>

      <section id="work" className="section"><Heading eyebrow="Selected work" title="Projects built to work in the real world." text="Each project combines thoughtful engineering with a clear purpose—from connected devices to scalable web systems."/>
        <div className="projects">{[FEATURED,...projects].filter((project,index,all)=>all.findIndex(item=>item.id===project.id)===index).map((p,i)=><ProjectCard project={p} index={i} key={p.id}/>)}</div>
        {projects.length===0&&<div className="add-prompt"><span><Layers3/> More work is ready to be added.</span><button onClick={()=>setLogin(true)}>Manage projects <ArrowRight/></button></div>}
      </section>

      <section id="services" className="section"><Heading eyebrow="How I can help" title="Technical depth, focused on your outcome."/>
        <div className="services">{SERVICES.map(([Icon,title,text],i)=><article key={title}><header><span>0{i+1}</span><Icon/></header><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="about" className="section about"><div><small>ABOUT ME</small><h2>A developer who cares about what happens after launch.</h2><p>I’m Arwin, a backend developer based in Metro Manila. I build maintainable systems with clear data flows, practical architecture, and room to grow.</p><p>My experience spans REST APIs, PostgreSQL, Kafka, containerized environments, IoT sensor pipelines, and machine-learning integration.</p><a href="mailto:rwinmadeja@gmail.com">Tell me about your project <ArrowRight/></a></div>
        <aside><header><b>Core toolkit</b><Code2/></header><div className="stack">{STACK.map(x=><span key={x}>{x}</span>)}</div><footer><b>DOST</b><span>Backend Developer Intern · 2026</span></footer></aside>
      </section>

      <section id="contact" className="contact"><small>HAVE A PROJECT IN MIND?</small><h2>Let’s build something useful.</h2><p>Tell me what you’re working on, what’s getting in the way, and where you want to take it.</p><div><a href="mailto:rwinmadeja@gmail.com"><Mail/> rwinmadeja@gmail.com</a><a href="https://github.com/Tokikaze0" target="_blank" rel="noreferrer"><Github/> View GitHub</a></div></section>
    </main>}
    <footer className="page-footer"><span><b>AM</b> Arwin Madeja · Backend Developer</span><span>Marikina City, Metro Manila</span></footer>
    {login&&<Login close={()=>setLogin(false)} success={()=>{setLogin(false);setManager(true)}}/>}
    {manager&&<Manager projects={projects} save={save} remove={remove} close={()=>setManager(false)}/>} 
    </div>
  </div>;
}

function Heading({eyebrow,title,text}) { return <div className="heading"><div><small>{eyebrow}</small><h2>{title}</h2></div>{text&&<p>{text}</p>}</div>; }
