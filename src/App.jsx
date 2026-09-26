import { useState } from "react";
import ClientPortfolio from "./ClientPortfolio.jsx";
import Portfolio from "./Portfolio.jsx";

const options = [
  {
    key: "client",
    eyebrow: "Quest log / client systems",
    title: "Client Portfolio",
    text: "Explore selected systems, services, and technical work built for real-world outcomes.",
    className: "client-option",
  },
  {
    key: "personal",
    eyebrow: "Quest log / player profile",
    title: "Personal Portfolio",
    text: "Read the full profile, experience, skills, education, and certifications.",
    className: "personal-option",
  },
];

function Landing({ onSelect }) {
  return (
    <main className="landing" aria-labelledby="landing-title">
      <div className="landing-noise" aria-hidden="true" />
      <div className="landing-orbit orbit-a" aria-hidden="true" />
      <div className="landing-orbit orbit-b" aria-hidden="true" />
      <section className="landing-content">
        <p className="landing-kicker">ARWIN MADEJA / QUEST SELECT</p>
        <h1 id="landing-title">Choose your <em>quest line.</em></h1>
        <p className="landing-intro">
          Explore dependable backend systems, connected worlds, and the player behind the build.
        </p>
        <div className="landing-actions">
          {options.map((option) => (
            <button
              key={option.key}
              className={`portfolio-choice ${option.className}`}
              type="button"
              onClick={() => onSelect(option.key)}
            >
              <span className="choice-index">0{option.key === "client" ? 1 : 2}</span>
              <span className="choice-copy">
                <span className="choice-eyebrow">{option.eyebrow}</span>
                <strong>{option.title}</strong>
                <span>{option.text}</span>
              </span>
              <span className="choice-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <footer className="landing-footer">
          <span>BACKEND · IOT · ML / LVL 01</span>
          <span>MARIKINA CITY, METRO MANILA</span>
        </footer>
      </section>
    </main>
  );
}

function LandingStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');

      :root { font-family: 'DM Sans', sans-serif; color: #f8f4ff; background: #08001f; }
      * { box-sizing: border-box; }
      html, body, #root { min-height: 100%; margin: 0; }
      button { font: inherit; }
      .landing { min-height: 100vh; position: relative; overflow: hidden; background: #08001f; isolation: isolate; }
      .landing::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(83,31,255,.78), transparent 36%), linear-gradient(145deg, #08001f 0%, #18005c 48%, #3c007c 100%); z-index: -3; }
      .landing::after { content: ''; position: absolute; inset: 0; opacity: .3; z-index: -2; background-image: radial-gradient(circle, rgba(255,255,255,.75) 0 1px, transparent 1.5px), linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.06) 1px, transparent 1px); background-size: 120px 120px, 52px 52px, 52px 52px; mask-image: linear-gradient(to bottom, black, transparent 90%); }
      .landing-noise { position: absolute; inset: 0; opacity: .06; z-index: -1; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E"); }
      .landing-content { width: min(1120px, calc(100% - 48px)); min-height: 100vh; margin: auto; padding: 8vh 0 28px; display: flex; flex-direction: column; justify-content: center; position: relative; }
      .landing-kicker, .landing-footer, .choice-eyebrow { font-family: 'Space Grotesk', sans-serif; letter-spacing: .12em; text-transform: uppercase; }
      .landing-kicker { margin: 0 0 28px; color: #77f3ff; font-size: 12px; font-weight: 600; text-shadow: 0 0 18px rgba(73,226,255,.8); }
      h1 { max-width: 780px; margin: 0; font: 700 clamp(3.5rem, 9vw, 8.2rem)/.93 'Space Grotesk', sans-serif; letter-spacing: 0; }
      h1 em { color: #ff55d6; font-style: normal; text-shadow: 0 0 28px rgba(255,44,211,.75); }
      .landing-intro { max-width: 490px; margin: 32px 0 48px; color: #ddd1ff; font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.6; }
      .landing-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; max-width: 850px; }
      .portfolio-choice { min-height: 174px; padding: 24px; display: grid; grid-template-columns: auto 1fr auto; gap: 18px; text-align: left; color: #f8f4ff; border: 1px solid rgba(119,243,255,.45); border-radius: 14px; cursor: pointer; transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease; box-shadow: inset 0 0 30px rgba(108,31,255,.2), 0 12px 30px rgba(0,0,0,.22); }
      .portfolio-choice:hover { transform: translateY(-5px); border-color: #ff55d6; box-shadow: 0 0 24px rgba(255,55,219,.32), inset 0 0 32px rgba(95,41,255,.35); }
      .portfolio-choice:focus-visible { outline: 3px solid #77f3ff; outline-offset: 4px; }
      .client-option { background: linear-gradient(135deg, rgba(35,11,111,.84), rgba(3,111,153,.48)); }
      .personal-option { background: linear-gradient(135deg, rgba(57,7,106,.84), rgba(16,30,122,.58)); }
      .choice-index { color: #77f3ff; font: 600 13px 'Space Grotesk', sans-serif; text-shadow: 0 0 12px rgba(119,243,255,.8); }
      .choice-copy { display: flex; flex-direction: column; gap: 10px; }
      .choice-eyebrow { color: #77f3ff; font-size: 10px; }
      .choice-copy strong { font: 600 clamp(1.15rem, 2vw, 1.55rem)/1.15 'Space Grotesk', sans-serif; }
      .choice-copy > span:last-child { max-width: 32ch; color: #ddd1ff; font-size: 14px; line-height: 1.5; }
      .choice-arrow { color: #ff55d6; font-size: 25px; line-height: 1; text-shadow: 0 0 15px rgba(255,85,214,.8); }
      .landing-footer { display: flex; justify-content: space-between; gap: 20px; margin-top: auto; padding-top: 72px; color: rgba(210,195,255,.7); font-size: 10px; }
      .landing-orbit { position: absolute; border: 1px solid rgba(119,243,255,.3); border-radius: 50%; pointer-events: none; z-index: -1; box-shadow: 0 0 30px rgba(119,243,255,.12); }
      .orbit-a { width: 48vw; height: 48vw; min-width: 420px; min-height: 420px; right: -15vw; top: -18vw; }
      .orbit-b { width: 24vw; height: 24vw; min-width: 250px; min-height: 250px; right: 5vw; top: 4vw; border-color: rgba(255,85,214,.4); }
      @media (max-width: 700px) { .landing-content { width: min(100% - 32px, 540px); padding-top: 48px; } .landing-kicker { margin-bottom: 22px; } .landing-intro { margin: 24px 0 34px; } .landing-actions { grid-template-columns: 1fr; } .portfolio-choice { min-height: 150px; } .landing-footer { padding-top: 48px; flex-direction: column; gap: 8px; } }
      @media (prefers-reduced-motion: reduce) { .portfolio-choice { transition: none; } .portfolio-choice:hover { transform: none; } }
    `}</style>
  );
}

export default function App() {
  const [view, setView] = useState(null);
  if (view === "client") return <ClientPortfolio />;
  if (view === "personal") return <Portfolio />;
  return <><LandingStyles /><Landing onSelect={setView} /></>;
}
