import { useEffect, useRef } from 'react';
import HeroScene from './components/HeroScene';
import ProjectStrip from './components/ProjectStrip';
import './App.css';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function R({ children, className = '', as: Tag = 'div' }) {
  const ref = useReveal();
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

/* ========================================
   HERO
   ======================================== */
function Hero() {
  return (
    <section className="hero">
      <div className="canvas-wrap">
        <HeroScene />
        <div className="hero-crosshair" />
      </div>

      <div className="hero-content">
        <div className="hero-tag">Learning Challenge // Spring 2026</div>
        <h1 className="hero-title">
          Aaron's <span className="accent">Agents</span>
        </h1>
        <p className="hero-sub">
          From asking ChatGPT basic questions to building six autonomous AI systems
          that trade markets, manage knowledge, and design interfaces.
        </p>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">6</div>
            <div className="hero-stat-label">Systems</div>
          </div>
          <div>
            <div className="hero-stat-value">0</div>
            <div className="hero-stat-label">Prior exp.</div>
          </div>
          <div>
            <div className="hero-stat-value">24/7</div>
            <div className="hero-stat-label">Active</div>
          </div>
          <div>
            <div className="hero-stat-value">38K</div>
            <div className="hero-stat-label">Backtested</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   INTRO
   ======================================== */
function Intro() {
  return (
    <section className="intro">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">00 — Origin</span>
          </div>
        </R>
        <div className="intro-grid">
          <R>
            <div className="intro-lead">
              Six months ago, I was copy-pasting prompts into ChatGPT and thinking that
              counted as "using AI." Then I asked myself:{' '}
              <em>what if I stopped consuming and started building?</em>
            </div>
          </R>
          <R>
            <div className="intro-body">
              <p>
                Not tutorials. Not following along with someone else's project. Actually
                building things that solved problems I cared about, from scratch, learning
                whatever I needed to learn along the way.
              </p>
              <p>
                What followed was the most intense period of self-directed learning I've
                ever experienced. I went from zero to six working AI systems in a matter of
                months.
              </p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   QUOTE
   ======================================== */
function QuoteBreak({ text }) {
  return (
    <div className="container">
      <R>
        <div className="quote-break">
          <div className="quote-text">{text}</div>
        </div>
      </R>
    </div>
  );
}

/* ========================================
   PROJECT — MOOSE
   ======================================== */
function ProjectMoose() {
  return (
    <section className="project-moose">
      <div className="project-bg-canvas">
        <ProjectStrip type="network" />
      </div>
      <div className="container">
        <div className="project-inner">
          <R>
            <div className="section-header">
              <span className="section-tag">01 — Personal Knowledge Butler</span>
            </div>
          </R>
          <R>
            <h3 className="project-name">Moose</h3>
            <div className="project-tagline">Personal Knowledge Butler</div>
          </R>
          <R>
            <div className="project-desc" style={{ textAlign: 'center' }}>
              <p>A self-hosted knowledge management system built around an Obsidian vault. Raw files land in an inbox, get parsed into structured records, embedded for semantic search, then analyzed for cross-cutting patterns.</p>
              <p>Runs on Python with FastAPI and SQLite. Uses Claude Code as lightweight subprocess workers — one watches the inbox, one generates embeddings, one identifies insights, one sends daily Telegram summaries, one validates system integrity.</p>
            </div>
          </R>
          <R>
            <div className="project-lesson">
              <div className="project-lesson-label">What I learned</div>
              <div className="project-lesson-text">The hardest part of a knowledge system isn't the technology — it's deciding what structure to impose on messy, unstructured information.</div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   PROJECT — EQUITYBRAIN
   ======================================== */
function ProjectEquity() {
  return (
    <section className="project-equity">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">02 — AI Investing Hub</span>
          </div>
        </R>
        <R>
          <div className="project-equity-grid">
            <div className="project-equity-canvas">
              <ProjectStrip type="waveform" />
            </div>
            <div className="project-equity-text">
              <h3 className="project-name">EquityBrain</h3>
              <div className="project-tagline">AI Investing Hub</div>
              <div className="project-desc">
                <p>An investing platform built around long-term theses rather than stock picks. Create a thesis — "autonomous vehicles will reshape logistics" — and the system continuously tracks evidence, monitors checkpoints, and logs conviction changes.</p>
                <p>The Socratic dialogue engine generates context-aware questions connecting article insights to existing beliefs. It challenges assumptions and extracts inferences to learn about biases over time.</p>
              </div>
            </div>
          </div>
        </R>
        <R>
          <div className="project-lesson">
            <div className="project-lesson-label">What I learned</div>
            <div className="project-lesson-text">AI is most powerful not when it gives you answers, but when it asks you better questions.</div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================
   PROJECT — TRADING
   ======================================== */
function ProjectTrading() {
  return (
    <section className="project-trading">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">03 — Autonomous Trading Systems</span>
          </div>
        </R>
        <R>
          <h3 className="project-name">Tod, Sunny & AeroTrade</h3>
          <div className="project-tagline">Autonomous Trading Systems</div>
        </R>
        <R>
          <div className="trading-grid">
            <div className="trading-cell">
              <div className="trading-cell-canvas">
                <ProjectStrip type="bars" />
              </div>
              <div className="trading-col-name">Tod</div>
              <div className="trading-col-desc">Ingests from seven real-time sources. A three-layer optimization makes 24/7 AI trading viable: auto-rules, decision cache, and full AI evaluation for the remaining 5-10%. Every night at 9:30 PM, an autonomous loop modifies the codebase and restarts services.</div>
            </div>
            <div className="trading-cell">
              <div className="trading-cell-canvas">
                <ProjectStrip type="waveform" />
              </div>
              <div className="trading-col-name">Sunny</div>
              <div className="trading-col-desc">Targets Kalshi's temperature markets using statistical model blending. Backtested against 38K historical prices to validate edge before going live.</div>
            </div>
            <div className="trading-cell">
              <div className="trading-cell-canvas">
                <ProjectStrip type="matrix" />
              </div>
              <div className="trading-col-name">AeroTrade</div>
              <div className="trading-col-desc">Exploits weather model biases for Denver temperature contracts with self-correcting adjustments that improve accuracy over time.</div>
            </div>
          </div>
        </R>
        <R>
          <div className="project-lesson">
            <div className="project-lesson-label">What I learned</div>
            <div className="project-lesson-text">Watching your own system place a trade at 3 AM changes how you think about edge cases, risk management, and the gap between theory and practice.</div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================
   PROJECT — DESIGN STUDIO
   ======================================== */
function ProjectDesign() {
  return (
    <section className="project-design">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">04 — AI Design Laboratory</span>
          </div>
        </R>
        <R>
          <h3 className="project-name">Design Studio</h3>
          <div className="project-tagline">AI Design Laboratory</div>
        </R>
        <R>
          <div className="project-design-canvas">
            <ProjectStrip type="matrix" />
          </div>
        </R>
        <R>
          <div className="design-cols">
            <div className="project-desc">
              <p>A React-based laboratory with 56 distinct page designs, unified under a cohesive aesthetic inspired by NASA telemetry and Swiss typography. Built on a deliberately constrained two-color palette where variation comes only through opacity.</p>
            </div>
            <div className="project-desc">
              <p>Dotted borders, no rounded corners, ambient animations — breathing sensor grids, flowing particle systems. Every pixel intentional.</p>
            </div>
          </div>
        </R>
        <R>
          <div className="project-lesson">
            <div className="project-lesson-label">What I learned</div>
            <div className="project-lesson-text">Limiting myself to two colors and rigid rules forced more creativity than unlimited options ever would have.</div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================
   PROJECT — READER
   ======================================== */
function ProjectReader() {
  return (
    <section className="project-reader">
      <div className="project-flow-bg">
        <ProjectStrip type="flow" />
      </div>
      <div className="container">
        <div className="project-inner">
          <R>
            <div className="section-header">
              <span className="section-tag">05 — Intelligent Newsletter Aggregator</span>
            </div>
          </R>
          <R>
            <h3 className="project-name">Reader</h3>
            <div className="project-tagline">Intelligent Newsletter Aggregator</div>
          </R>
          <R>
            <div className="project-desc" style={{ textAlign: 'center' }}>
              <p>Embeds AI analysis directly into the ingestion pipeline. Each article arrives pre-summarized, rated for relevance on a 1-10 scale, and tagged. Content enters through RSS, IMAP newsletters, and direct HTML parsing.</p>
              <p>A smart sort algorithm blends recency, feed priority, and AI relevance to reorder the queue. Bridges consumption and knowledge management by syncing highlights to a knowledge graph connecting Moose and EquityBrain.</p>
            </div>
          </R>
          <R>
            <div className="project-lesson">
              <div className="project-lesson-label">What I learned</div>
              <div className="project-lesson-text">The best tools disappear into your routine. I don't think about Reader when I use it — the most important things are just there.</div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   TIMELINE
   ======================================== */
function Timeline() {
  const items = [
    { month: 'Month 1', text: 'Started with ChatGPT basics. Decided to build instead of browse. Began Moose.' },
    { month: 'Month 2', text: 'Learned Python, FastAPI, SQLite. Moose knowledge pipeline working. Started Reader.' },
    { month: 'Month 3', text: 'Reader live. Started EquityBrain. Learned React and Next.js.' },
    { month: 'Month 4', text: 'EquityBrain Socratic engine built. Began weather research for Sunny.' },
    { month: 'Month 5', text: 'Sunny backtesting 38K prices. Tod running 24/7. Started Design Studio.' },
    { month: 'Month 6', text: 'AeroTrade live-trading Denver. Design Studio at 56 pages. All systems autonomous.' },
  ];
  return (
    <section className="timeline-section">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">06 — Timeline</span>
          </div>
        </R>
        <R>
          <h2 className="timeline-title">Six months of building.</h2>
        </R>
        <R>
          <div className="timeline-grid">
            {items.map((item, i) => (
              <div className="timeline-cell" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-month">{item.month}</div>
                <div className="timeline-content">{item.text}</div>
              </div>
            ))}
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================
   REFLECTIONS
   ======================================== */
function Reflections() {
  return (
    <section className="reflections-section">
      <div className="container">
        <R>
          <div className="section-header">
            <span className="section-tag">07 — Reflections</span>
          </div>
        </R>
        <R>
          <h2 className="reflections-title">What I'm taking with me.</h2>
        </R>
        <R>
          <div className="reflections-grid">
            <div className="reflection-card">
              <h3>The biggest impact</h3>
              <p>
                The realization that I could teach myself to build anything if I was willing
                to be bad at it first. Every project started with me not knowing how to do the
                core thing it required. That cycle repeated six times, and each time it got
                faster because the skills compounded.
              </p>
            </div>
            <div className="reflection-card">
              <h3>Professional shift</h3>
              <p>
                Before this challenge, I saw AI as something other people built and I consumed.
                Now I see it as a tool I can shape to solve specific problems. In finance, the
                people who can build their own tools have an enormous edge.
              </p>
            </div>
            <div className="reflection-card">
              <h3>What comes next</h3>
              <p>
                I'm going to keep building. These systems are all running on my Mac Studio
                right now. They'll still be running after I graduate. This learning challenge
                didn't end with the semester — it just gave me the push to start.
              </p>
            </div>
            <div className="reflection-card">
              <h3>For anyone watching</h3>
              <p>
                This site is for anyone curious about what happens when you stop watching from
                the sidelines and start building with AI. You don't need to be technical. I
                wasn't when I started.
              </p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================
   FOOTER
   ======================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-text">AGENTS</div>
      <div className="footer-inner">
        <div className="footer-divider" />
        <div className="footer-text">Aaron Friedman — Spring 2026</div>
      </div>
    </footer>
  );
}

/* ========================================
   APP
   ======================================== */
function App() {
  return (
    <div className="page">
      <Hero />

      <div className="content">
        <Intro />

        <div className="section-separator" />
        <QuoteBreak text="The best way to learn how AI works is to build things that break, then figure out why." />
        <div className="section-separator" />

        <ProjectMoose />
        <div className="section-separator" />

        <QuoteBreak text="AI is most powerful not when it gives you answers, but when it asks you better questions." />
        <div className="section-separator" />

        <ProjectEquity />
        <div className="section-separator" />

        <ProjectTrading />
        <div className="section-separator" />

        <QuoteBreak text="The best creative work comes from constraints, not freedom." />
        <div className="section-separator" />

        <ProjectDesign />
        <div className="section-separator" />

        <ProjectReader />
        <div className="section-separator" />

        <QuoteBreak text="The people who can build their own tools have an enormous edge over those who can only use what's available off the shelf." />
        <div className="section-separator" />

        <Timeline />
        <div className="section-separator" />

        <Reflections />
        <div className="section-separator" />

        <section className="video-section">
          <div className="container">
            <R>
              <div className="section-header">
                <span className="section-tag">08 — Video</span>
              </div>
            </R>
            <R>
              <h2 className="video-title">Watch the walkthrough.</h2>
            </R>
            <R>
              <div className="video-embed">
                <iframe
                  src="https://www.youtube.com/embed/eAS4X9mQEJU"
                  title="Aaron's Agents — Learning Challenge"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </R>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
