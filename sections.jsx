/* Sections — Hero, Offerings, Utilities, Dashboards, Announcements,
   Programs, Featured tiles, Resources triptych, CTA strip, Footer */

const { useState, useRef, useEffect } = React;

/* small helper to pick a featured tile icon by key */
function featIcon(key) {
  const map = {
    cube: <IconCube size={20}/>,
    globe: <IconGlobe size={20}/>,
    link: <IconLink size={20}/>,
    term: <IconTerm size={20}/>,
    code: <IconCode size={20}/>,
    build: <IconBuild size={20}/>,
    grid: <IconGrid size={20}/>,
    stack: <IconStack size={20}/>,
    bolt: <IconBolt size={20}/>,
  };
  return map[key] || null;
}

/* ============== Hero ============== */
function Hero({ variant = "search", onOpenSearch }) {
  return (
    <section className="hero" id="welcome">
      <div className="shell">
        <div className="hero-halftone" aria-hidden="true"></div>

        <div className="hero-tagline">
          <span className="dot"></span>
          <span className="eyebrow">Stratus Cloud Platform · Internal</span>
          <span className="tag-mono" style={{color: "var(--ink-3)", marginLeft: 8}}>v2026.05</span>
        </div>

        <div className="hero-head float-in">
          <h1 className="display-xl">
            Real platform.<br/>
            Real scale.
          </h1>
          <p className="body" style={{maxWidth: 360, fontSize: 16, paddingBottom: 12}}>
            Stratus is an integrated developer platform for shipping software across
            private and public clouds. One catalog, one CLI, one place to learn.
          </p>
        </div>

        <div className="hero-body">
          <div>
            {variant === "search" && (
              <div className="hero-search" onClick={onOpenSearch} role="search">
                <IconSearch size={20} stroke="var(--ink-3)"/>
                <input
                  placeholder="Search platforms, services, runbooks…"
                  onFocus={(e) => { e.target.blur(); onOpenSearch(); }}
                  readOnly
                />
                <span className="kbd" style={{marginRight: 4}}>⌘ K</span>
                <button className="btn btn-primary" type="button" onClick={onOpenSearch}>
                  Search <IconArrowR size={16}/>
                </button>
              </div>
            )}
            {variant === "actions" && (
              <div style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
                <button className="btn btn-primary">Start onboarding <IconArrowR size={16}/></button>
                <button className="btn btn-ghost">Browse catalog</button>
                <button className="btn btn-ghost">View status</button>
              </div>
            )}

            {/* Onboarding CTA — always visible under the hero search */}
            <a href="#onboard" className="hero-onboard"
               onClick={(e) => {
                 e.preventDefault();
                 const el = document.getElementById("onboard");
                 if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
               }}>
              <span className="hero-onboard-tag">New</span>
              <span className="hero-onboard-text">
                <strong>New to the cloud?</strong> Start onboarding in under 5 minutes
              </span>
              <IconArrowR size={16}/>
            </a>

            <p className="body" style={{marginTop: 22, maxWidth: 520}}>
              Search for managed services, runbooks, dashboards or onboarding flows.
              Or jump straight into the catalog.
            </p>
          </div>

          <div className="hero-stat-row">
            <div className="hero-stat">
              <div className="n">412</div>
              <div className="l">Services live</div>
            </div>
            <div className="hero-stat">
              <div className="n">99.98%</div>
              <div className="l">Platform SLO</div>
            </div>
            <div className="hero-stat">
              <div className="n">38</div>
              <div className="l">Active programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Offerings grid ============== */
function OfferingsSection() {
  return (
    <section className="section" id="cloud-products">
      <div className="shell">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" style={{marginBottom: 12}}>Cloud Offerings</div>
            <h2 className="display-m">A platform for every workload — pick the cloud that fits.</h2>
          </div>
          <div className="right">
            <a className="link-arrow" href="#">Compare offerings <IconArrowR size={16}/></a>
          </div>
        </div>

        <div className="offer-grid">
          {OFFERINGS.map((o) => (
            <article key={o.id} className="offer-card">
              <div className="halftone-art" aria-hidden="true"></div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                <div className="offer-badge">{o.badge}</div>
                <span className="tag-mono" style={{color: "var(--ink-3)"}}>{o.status}</span>
              </div>
              <div>
                <h3 className="title" style={{marginBottom: 4}}>{o.name}</h3>
                <div className="small" style={{color: "var(--ink-3)"}}>{o.kind} · {o.region}</div>
              </div>
              <p className="body" style={{fontSize: 14}}>{o.blurb}</p>
              <div className="actions">
                <a className="link-arrow" href="#">Learn more</a>
                <span style={{color: "var(--line-strong)"}}>·</span>
                <a className="link-arrow" href="#">Roadmap <IconArrowUR size={14}/></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Utilities + Dashboards ============== */
function QuickLaunch() {
  return (
    <section className="section-tight">
      <div className="shell">
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
          <QuickGroup eyebrow="Utilities" title="Day-to-day tools" items={UTILITIES}/>
          <QuickGroup eyebrow="Dashboards" title="See what's happening" items={DASHBOARDS}/>
        </div>
      </div>
    </section>
  );
}

function QuickGroup({ eyebrow, title, items }) {
  return (
    <div>
      <div style={{display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 16}}>
        <div>
          <div className="eyebrow" style={{marginBottom: 6}}>{eyebrow}</div>
          <h3 className="title">{title}</h3>
        </div>
        <a className="link-arrow" href="#">See all <IconArrowR size={14}/></a>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
        {items.map((i) => (
          <a key={i.id} href="#" className="launch-card">
            <div className="swatch" style={{background: i.swatch}}>{i.badge}</div>
            <div className="title-row">
              <div className="name">{i.name}</div>
              <div className="sub">{i.sub}</div>
            </div>
            <div className="open"><IconArrowUR size={18}/></div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============== Announcements carousel ============== */
function Announcements({ enabled = true }) {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);

  if (!enabled) return null;

  const scrollTo = (i) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.children[i];
    if (!card) return;
    t.scrollTo({ left: card.offsetLeft - 0, behavior: "smooth" });
    setIdx(i);
  };

  const prev = () => scrollTo(Math.max(0, idx - 1));
  const next = () => scrollTo(Math.min(ANNOUNCEMENTS.length - 1, idx + 1));

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => {
        const ni = (i + 1) % ANNOUNCEMENTS.length;
        const track = trackRef.current;
        if (track && track.children[ni]) {
          track.scrollTo({ left: track.children[ni].offsetLeft, behavior: "smooth" });
        }
        return ni;
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section" id="announcements">
      <div className="shell">
        <div className="ann-shell">
          <div style={{display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 28}}>
            <div>
              <div className="eyebrow" style={{marginBottom: 8}}>Announcements</div>
              <h2 className="display-m">What's new on the platform</h2>
            </div>
          </div>

          <div className="ann-controls">
            <button onClick={prev} disabled={idx === 0} aria-label="Previous"><IconArrowL size={16}/></button>
            <button onClick={next} disabled={idx === ANNOUNCEMENTS.length - 1} aria-label="Next"><IconArrowR size={16}/></button>
          </div>

          <div className="ann-track" ref={trackRef}>
            {ANNOUNCEMENTS.map((a, i) => (
              <article key={i} className="ann-card">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <span className="pill" style={{background: a.tile}}>{a.pill}</span>
                  <span className="tag-mono" style={{color: "var(--ink-3)"}}>{a.date}</span>
                </div>
                <h4 style={{fontSize: 17, lineHeight: 1.3, margin: 0, fontWeight: 600, letterSpacing: "-0.01em"}}>{a.title}</h4>
                <p className="body" style={{fontSize: 13, lineHeight: 1.5, marginTop: "auto"}}>{a.body}</p>
                <a className="link-arrow" href="#" style={{fontSize: 13}}>Read more <IconArrowR size={14}/></a>
              </article>
            ))}
          </div>

          <div style={{display: "flex", gap: 6, marginTop: 18}}>
            {ANNOUNCEMENTS.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`}
                      style={{width: i === idx ? 24 : 8, height: 8, borderRadius: 4,
                              background: i === idx ? "var(--ink)" : "rgba(20,23,28,.18)",
                              transition: "all .2s ease"}}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Programs ============== */
function Programs() {
  return (
    <section className="section" id="programs">
      <div className="shell">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" style={{marginBottom: 12}}>Programs</div>
            <h2 className="display-m">Working groups & cohorts shaping the platform.</h2>
            <p className="body" style={{marginTop: 12, maxWidth: 580}}>
              Stay informed about current programs of Cloud Engineering — join a cohort, contribute to a working group, or apply for the engineering residency.
            </p>
          </div>
          <div className="right">
            <a className="link-arrow" href="#">See all programs <IconArrowR size={16}/></a>
          </div>
        </div>

        <div className="programs-grid">
          {PROGRAMS.map((p) => (
            <a key={p.id} href="#" className="program-card">
              <div className="pgm-num">{p.num} / {String(PROGRAMS.length).padStart(2, "0")}</div>
              <div className="pgm-name">{p.name}</div>
              <p className="pgm-body">{p.body}</p>
              <div style={{display: "flex", alignItems: "center", marginTop: 16}}>
                <span style={{fontSize: 13, fontWeight: 500}}>Learn more</span>
                <IconArrowUR size={16} style={{marginLeft: 8}}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Featured tiles (asymmetric mosaic) ============== */
function FeaturedTiles() {
  return (
    <section className="section-tight" id="featured">
      <div className="shell">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" style={{marginBottom: 12}}>Featured</div>
            <h2 className="display-m">Jump straight in.</h2>
          </div>
        </div>

        <div className="feat-grid">
          {FEATURED.map((f) => (
            <a key={f.id} href={f.href || "#"}
               className={`feat-tile feat-span-${f.span} ${f.cta ? "feat-cta" : ""}`}
               style={f.tile && !f.cta ? {background: f.tile, borderColor: "transparent"} : undefined}>
              <div className="ico" style={{background: f.cta ? "rgba(255,255,255,.12)" : "rgba(20,23,28,.06)", color: f.cta ? "var(--bg)" : "var(--ink)"}}>
                {featIcon(f.ico)}
              </div>
              <div>
                <div className="lbl">{f.lbl}</div>
                <div className="sub" style={{color: f.cta ? "rgba(255,255,255,.65)" : undefined}}>{f.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Resources triptych (Support / Getting Started / Cloud Model) ============== */
function ResourcesTriptych() {
  return (
    <section className="section" id="resources">
      <div className="shell">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" style={{marginBottom: 12}}>Resources & Support</div>
            <h2 className="display-m">Learn fast. Ship faster. Get unstuck.</h2>
          </div>
        </div>

        <div className="tri-grid">
          {/* Support */}
          <div className="tri-panel tinted-1">
            <div>
              <div className="eyebrow" style={{marginBottom: 8}}>Support</div>
              <h3 className="title">When you need a human</h3>
            </div>
            {SUPPORT_LINKS.map((g, gi) => (
              <div key={gi}>
                <div className="subgroup">{g.group}</div>
                <div className="tri-list">
                  {g.items.map((it, ii) => (
                    <a key={ii} className="link-row" href={it.to}>
                      <span>{it.name}</span>
                      <IconArrowUR size={14} className="arr"/>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div className="subgroup">Slack channels</div>
              <div className="chips">
                {SLACK_CHANNELS.map((c, ci) => (
                  <a key={ci} className="chip" href="#">{c}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="tri-panel tinted-2">
            <div>
              <div className="eyebrow" style={{marginBottom: 8}}>Getting Started</div>
              <h3 className="title">New to Stratus?</h3>
            </div>
            {GETTING_STARTED.map((g, gi) => (
              <div key={gi}>
                <div className="subgroup">{g.group}</div>
                <div className="tri-list">
                  {g.items.map((it, ii) => (
                    <a key={ii} className="link-row" href={it.to}>
                      <span>{it.name}</span>
                      <IconArrowUR size={14} className="arr"/>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div style={{
              marginTop: "auto",
              padding: "16px",
              background: "rgba(20,23,28,.06)",
              borderRadius: "var(--r-md)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{width: 36, height: 36, borderRadius: 10, background: "var(--ink)", color: "var(--accent)",
                            display: "grid", placeItems: "center"}}>
                <IconPlay size={16}/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 14, fontWeight: 600}}>Watch the 4-minute tour</div>
                <div style={{fontSize: 12, color: "var(--ink-2)"}}>Stratus in motion</div>
              </div>
              <IconArrowR size={16}/>
            </div>
          </div>

          {/* Cloud model + helpful links */}
          <div className="tri-panel tinted-3">
            <div>
              <div className="eyebrow" style={{marginBottom: 8}}>Cloud offerings</div>
              <h3 className="title">Choose your model</h3>
            </div>
            {CLOUD_MODEL.map((g, gi) => (
              <div key={gi}>
                <div className="subgroup">{g.group}</div>
                <div className="tri-list">
                  {g.items.map((it, ii) => (
                    <a key={ii} className="link-row" href={it.to}>
                      <span>{it.name}</span>
                      <IconArrowUR size={14} className="arr"/>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== CTA strip ============== */
function CTAStrip() {
  return (
    <section className="section" id="onboard">
      <div className="shell">
        <div className="cta-strip">
          <div className="cta-orb"></div>
          <div style={{position: "relative", zIndex: 1}}>
            <div className="eyebrow" style={{color: "rgba(255,255,255,.55)", marginBottom: 16}}>Onboarding</div>
            <h2 className="display-l">New to the platform? <br/>Start in under five minutes.</h2>
            <p className="body" style={{maxWidth: 480, marginTop: 18}}>
              Onboarding walks you through workspace setup, CLI install, and pushing your first sample service.
              We'll check progress as you go.
            </p>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", position: "relative", zIndex: 1}}>
            <button className="btn btn-accent" style={{padding: "14px 22px"}}>Start onboarding <IconArrowR size={16}/></button>
            <button className="btn btn-ghost">Check onboarding status</button>
            <div style={{display: "flex", alignItems: "center", gap: 10, marginTop: 12, color: "rgba(255,255,255,.7)"}}>
              <div style={{width: 26, height: 26, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)",
                            display: "grid", placeItems: "center"}}>
                <IconCheck size={14}/>
              </div>
              <div style={{fontSize: 13}}>2,418 engineers onboarded last quarter</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Footer ============== */
function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{marginBottom: 16}}>
              <div className="logo-mark">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
                  <circle cx="3" cy="3" r="1.7"/><circle cx="9" cy="3" r="1.7"/><circle cx="15" cy="3" r="1.7"/>
                  <circle cx="3" cy="9" r="1.7"/><circle cx="9" cy="9" r="1.7"/>
                  <circle cx="3" cy="15" r="1.7"/>
                </svg>
              </div>
              stratus
            </div>
            <p className="small" style={{maxWidth: 360}}>
              An internal developer platform for shipping software across private and public clouds.
              Built and maintained by the Cloud Engineering team.
            </p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#">Helix</a>
            <a href="#">AWS · GCP · Azure</a>
            <a href="#">Cloud CLI</a>
            <a href="#">API Gateway</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Release Notes</a>
            <a href="#">Stratus University</a>
            <a href="#">Status</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Service Desk</a>
            <a href="#">Slack channels</a>
            <a href="#">FAQs</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Stratus Cloud Platform · Internal use only</div>
          <div style={{display: "flex", gap: 18}}>
            <a href="#">Code of conduct</a>
            <a href="#">Security</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, OfferingsSection, QuickLaunch, Announcements, Programs,
  FeaturedTiles, ResourcesTriptych, CTAStrip, Footer
});
