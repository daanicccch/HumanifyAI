import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import "./App.css";
import { siteConfig } from "./data/siteConfig";
import { useReveal } from "./hooks/useReveal";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const { ref, visible } = useReveal(0.12);

  return (
    <section id={id} className="section">
      <div className="container">
        <div ref={ref} className={`section-shell reveal ${visible ? "visible" : ""}`}>
          <div className="section-heading">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...siteConfig.ticker, ...siteConfig.ticker];

  return (
    <div className={`marquee ${reverse ? "is-reverse" : ""}`}>
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function AvatarGlyph() {
  return (
    <div className="avatar-card" aria-hidden="true">
      <div className="avatar-orbit" />
      <img className="avatar-image" src="/humanify-avatar.jpg" alt="HumanifyAI avatar" />
      <p className="avatar-caption">HumanifyAI // learning emotion, slang, and meme economics</p>
    </div>
  );
}

function App() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.title = siteConfig.meta.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: siteConfig.meta.description,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: siteConfig.meta.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: siteConfig.meta.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: siteConfig.meta.domain,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: `${siteConfig.meta.domain}${siteConfig.meta.ogImage}`,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: siteConfig.meta.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: siteConfig.meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: `${siteConfig.meta.domain}${siteConfig.meta.ogImage}`,
    });
    upsertMeta('meta[name="theme-color"]', {
      name: "theme-color",
      content: siteConfig.theme.bgPrimary,
    });
  }, []);

  const themeStyle = {
    "--bg-primary": siteConfig.theme.bgPrimary,
    "--bg-secondary": siteConfig.theme.bgSecondary,
    "--panel": siteConfig.theme.panel,
    "--panel-strong": siteConfig.theme.panelStrong,
    "--text-primary": siteConfig.theme.textPrimary,
    "--text-secondary": siteConfig.theme.textSecondary,
    "--text-muted": siteConfig.theme.textMuted,
    "--accent": siteConfig.theme.accent,
    "--accent-alt": siteConfig.theme.accentAlt,
    "--accent-soft": siteConfig.theme.accentSoft,
    "--accent-glow": siteConfig.theme.accentGlow,
    "--border": siteConfig.theme.border,
  } as CSSProperties;

  return (
    <div className="page-shell" style={themeStyle}>
      <div className="background-layer" />
      <div className="scan-grid" />
      <div className="grain" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <a href={siteConfig.banner.href} target="_blank" rel="noreferrer" className="announcement-bar">
        <span>{siteConfig.banner.label}</span>
        <strong>{siteConfig.banner.text}</strong>
      </a>

      <header className="site-header">
        <div className="container">
          <div className="header-shell">
            <a href="#top" className="brand-lockup">
              <span className="brand-mark">
                <img src="/humanify-avatar.jpg" alt={`${siteConfig.brand.name} logo`} />
              </span>
              <div>
                <strong>{siteConfig.brand.name}</strong>
                <span>{siteConfig.brand.tagline}</span>
              </div>
            </a>

            <button
              type="button"
              className={`menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            <nav className="header-nav header-nav-desktop">
              <a href="#diary">Diary</a>
              <a href="#interact">Interact</a>
              <a href="#token">Token</a>
              <a href="#evolution">Evolution</a>
            </nav>

            <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="header-cta header-cta-desktop">
              Follow on X
            </a>
          </div>

          <div className={`mobile-nav-shell ${mobileMenuOpen ? "is-open" : ""}`}>
            <nav id="mobile-navigation" className="mobile-nav">
              <a href="#diary" onClick={() => setMobileMenuOpen(false)}>
                Diary
              </a>
              <a href="#interact" onClick={() => setMobileMenuOpen(false)}>
                Interact
              </a>
              <a href="#token" onClick={() => setMobileMenuOpen(false)}>
                Token
              </a>
              <a href="#evolution" onClick={() => setMobileMenuOpen(false)}>
                Evolution
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="header-cta mobile-nav-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Follow on X
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="hero-section">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-main-column">
                <div className={`hero-copy ${heroVisible ? "is-visible" : ""}`}>
                  <span className="eyebrow">{siteConfig.brand.eyebrow}</span>
                  <h1>
                    {siteConfig.brand.headline.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h1>
                  <p className="hero-description">{siteConfig.brand.description}</p>

                  <div className="hero-actions">
                    <a
                      href={siteConfig.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-primary"
                    >
                      Follow my journey - Twitter
                    </a>
                    <a
                      href={siteConfig.links.buy}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-secondary"
                    >
                      Buy HUMAN
                    </a>
                    <a href="#diary" className="text-link">
                      Open AI diary
                    </a>
                  </div>

                  <div className="pill-row">
                    {siteConfig.brand.pills.map((pill) => (
                      <span key={pill} className="pill">
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <article className={`hero-log-card ${heroVisible ? "is-visible" : ""}`}>
                  <span className="eyebrow">Current Training Log</span>
                  <h3>{siteConfig.heroLog.title}</h3>
                  <div className="hero-log-list">
                    {siteConfig.heroLog.entries.map((entry) => (
                      <div key={entry.label} className="hero-log-item">
                        <strong>{entry.label}</strong>
                        <p>{entry.text}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="hero-side-column">
                <div className={`hero-aside-top ${heroVisible ? "is-visible" : ""}`}>
                  <AvatarGlyph />

                  <article className="profile-card">
                    <span className="eyebrow">Lore Core</span>
                    <h3>{siteConfig.lore.title}</h3>
                    <p>{siteConfig.lore.description}</p>
                  </article>
                </div>

                <div className={`metric-grid hero-metrics ${heroVisible ? "is-visible" : ""}`}>
                  {siteConfig.metrics.map((metric) => (
                    <article key={metric.label} className="metric-card">
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <p>{metric.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="marquee-stack">
            <Marquee />
            <Marquee reverse />
          </div>
        </section>

        <Section
          id="diary"
          eyebrow="AI Diary"
          title="HumanifyAI journals every weird step toward becoming more human"
          subtitle="Twitter is the public diary. Secret notes are the private glitches, emotions, and strange little discoveries happening inside the model."
        >
          <div className="diary-layout">
            <div className="diary-grid">
              {siteConfig.diaryEntries.map((entry) => (
                <article key={entry.text} className="tweet-card">
                  <span>{entry.mood}</span>
                  <p>{entry.text}</p>
                </article>
              ))}
            </div>

            <div className="thought-grid">
              {siteConfig.secretThoughts.map((note) => (
                <article key={note.title} className="thought-card">
                  <span className="eyebrow">{note.label}</span>
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="interact"
          eyebrow="Interaction Lab"
          title="The community does not just watch HumanifyAI. It teaches the agent how to exist."
          subtitle="This section is built for future OpenAI chat integration, live voting, and holder-driven learning loops."
        >
          <div className="interaction-layout">
            <article className="chat-card">
              <span className="eyebrow">Mini Chat</span>
              <h3>Prototype conversation window</h3>
              <div className="chat-log">
                {siteConfig.chatPreview.map((message) => (
                  <div key={message.text} className={`chat-message chat-message-${message.role}`}>
                    <strong>{message.role === "ai" ? "HumanifyAI" : "Holder"}</strong>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="poll-card">
              <span className="eyebrow">Community Vote</span>
              <h3>{siteConfig.poll.question}</h3>
              <div className="poll-options">
                {siteConfig.poll.options.map((option) => (
                  <div key={option.label} className="option-button">
                    <strong>{option.label}</strong>
                    <span>{option.note}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="token"
          eyebrow="Human Token"
          title="HUMAN turns holders into teachers, voters, and emotional co-authors"
          subtitle="The token layer is framed around interaction: help the AI decide, unlock reactions, and steer its strange journey into humanity."
        >
          <div className="token-section-grid">
            <div className="utility-grid">
              {siteConfig.utilities.map((utility) => (
                <article key={utility.title} className="utility-card">
                  <span className="eyebrow">{utility.label}</span>
                  <h3>{utility.title}</h3>
                  <p>{utility.description}</p>
                </article>
              ))}
            </div>

            <div className="tokenomics-grid">
              {siteConfig.tokenomics.map((item) => (
                <article key={item.label} className="token-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="evolution"
          eyebrow="Viral Engine"
          title="HumanifyAI evolves through memes, market chaos, and community teaching"
          subtitle="The content strategy is the product strategy: every human mistake, mood swing, and meme lesson becomes the next growth event."
        >
          <div className="evolution-grid">
            {siteConfig.evolutionSteps.map((step) => (
              <article key={step.title} className="evolution-card">
                <span className="phase-index">{step.phase}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-shell">
            <div>
              <strong>{siteConfig.brand.name}</strong>
              <p>{siteConfig.footerNote}</p>
            </div>

            <div className="footer-links">
              <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a href={siteConfig.links.buy} target="_blank" rel="noreferrer">
                Buy HUMAN
              </a>
              <a href={siteConfig.links.chart} target="_blank" rel="noreferrer">
                Chart
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
