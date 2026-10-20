/* ============================================
   Resources — Articles & How-to guides
   ============================================ */

const { useState: useStateRes, useEffect: useEffectRes, useMemo: useMemoRes } = React;

const PALETTES_RES = [
  { key: "cobalt", hex: "#2148E5" },
  { key: "coral",  hex: "#FE5F2D" },
  { key: "indigo", hex: "#5A3CE0" },
];

const RES_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cobalt",
  "density": "comfortable",
  "monoEyebrows": true
}/*EDITMODE-END*/;

function typeLabel(type) {
  const map = {
    guide: "How-to guide",
    tutorial: "Tutorial",
    concept: "Concept",
    reference: "Reference",
    release: "Release notes",
  };
  return map[type] || type;
}

function topicLabel(id) {
  return (RES_TOPICS.find(t => t.id === id) || {}).name || id;
}

/* ----- Featured card ----- */
function FeaturedCard({ article, variant = "default" }) {
  const isPrimary = variant === "primary";
  return (
    <a href="#" className={`res-feat-card ${isPrimary ? "primary" : ""}`}>
      {isPrimary && <div className="feat-halftone" aria-hidden="true"></div>}
      <div className="res-feat-eyebrow">
        {typeLabel(article.type)} · {topicLabel(article.topic)}
      </div>
      <h3 className="res-feat-title">{article.title}</h3>
      <p className="res-feat-blurb">{article.blurb}</p>
      <div className="res-feat-meta">
        <span>{article.readTime} read</span>
        <span className="sep"></span>
        <span>Updated {article.updated}</span>
      </div>
    </a>
  );
}

/* ----- Article row ----- */
function ArticleRow({ article }) {
  return (
    <a href="#" className="res-row" style={{textDecoration: "none"}}>
      <div className="res-row-type">
        <strong>{typeLabel(article.type)}</strong>
        <span>{topicLabel(article.topic)}</span>
      </div>
      <div>
        <h3 className="res-row-title">{article.title}</h3>
        <p className="res-row-blurb">{article.blurb}</p>
      </div>
      <div className="res-row-meta">{article.author}</div>
      <div className="res-row-read">
        {article.readTime}<br/>
        <span style={{opacity: .65}}>{article.updated}</span>
      </div>
    </a>
  );
}

/* ----- Path card ----- */
function PathCard({ path }) {
  return (
    <a href="#" className="path-card" style={{textDecoration: "none"}}>
      <h4 className="path-title">{path.title}</h4>
      <p className="path-sub">{path.sub}</p>
      <div className="path-meta">
        <span className="path-steps">{path.steps.length} steps</span>
        <span>·</span>
        <span>{path.duration}</span>
        <span>·</span>
        <span>{path.level}</span>
      </div>
    </a>
  );
}

/* ----- Main app ----- */
function ResourcesApp() {
  const [t, setTweak] = useTweaks(RES_DEFAULTS);
  const [searchOpen, setSearchOpen] = useStateRes(false);
  const [type, setType] = useStateRes("all");
  const [topic, setTopic] = useStateRes("all");
  const [level, setLevel] = useStateRes("all");
  const [q, setQ] = useStateRes("");

  useEffectRes(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-eyebrow", t.monoEyebrows ? "on" : "off");
  }, [t.palette, t.density, t.monoEyebrows]);

  useCmdK(setSearchOpen);

  const featured = useMemoRes(() => RES_ARTICLES.filter(a => a.featured), []);
  const allRest = useMemoRes(() => RES_ARTICLES.filter(a => !a.featured), []);

  const typeCounts = useMemoRes(() => {
    const counts = { all: RES_ARTICLES.length };
    RES_TYPES.forEach(tt => {
      if (tt.id !== "all") counts[tt.id] = RES_ARTICLES.filter(a => a.type === tt.id).length;
    });
    return counts;
  }, []);

  const topicCounts = useMemoRes(() => {
    const counts = { all: RES_ARTICLES.length };
    RES_TOPICS.forEach(tp => {
      if (tp.id !== "all") counts[tp.id] = RES_ARTICLES.filter(a => a.topic === tp.id).length;
    });
    return counts;
  }, []);

  const visible = useMemoRes(() => {
    let arr = allRest;
    if (type !== "all") arr = arr.filter(a => a.type === type);
    if (topic !== "all") arr = arr.filter(a => a.topic === topic);
    if (level !== "all") arr = arr.filter(a => a.level === level);
    if (q.trim()) {
      const term = q.toLowerCase();
      arr = arr.filter(a =>
        a.title.toLowerCase().includes(term) ||
        a.blurb.toLowerCase().includes(term) ||
        topicLabel(a.topic).toLowerCase().includes(term)
      );
    }
    return arr;
  }, [allRest, type, topic, level, q]);

  // Decide if we hide featured (when user is filtering)
  const isFiltering = type !== "all" || topic !== "all" || level !== "all" || q.trim() !== "";

  return (
    <React.Fragment>
      <TopNav onOpenSearch={() => setSearchOpen(true)} mode="cross-page" currentPage="resources"/>
      <main>
        <div className="shell">
          {/* breadcrumbs */}
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span className="sep">/</span>
            <span style={{color: "var(--ink)"}}>Resources</span>
          </nav>

          {/* hero */}
          <header className="res-hero">
            <div className="eyebrow" style={{marginBottom: 14}}>Resources</div>
            <h1>Articles & how-to guides<br/>for shipping on Stratus.</h1>
            <p className="body">
              Step-by-step guides, concept explainers, and reference docs maintained
              by the platform team and engineering guilds.
            </p>

            <div className="res-search">
              <IconSearch size={20} stroke="var(--ink-3)"/>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search guides, tutorials, references…"
              />
              {q && (
                <button className="clear" onClick={() => setQ("")} aria-label="Clear search">
                  <IconClose size={14}/>
                </button>
              )}
            </div>
          </header>

          {/* Type tabs */}
          <div className="res-tabs" role="tablist">
            {RES_TYPES.map((tt) => (
              <button key={tt.id} role="tab" aria-selected={type === tt.id}
                      className={`res-tab ${type === tt.id ? "active" : ""}`}
                      onClick={() => setType(tt.id)}>
                {tt.name}
                <span className="count">{typeCounts[tt.id] || 0}</span>
              </button>
            ))}
          </div>

          {/* Layout */}
          <div className="res-layout">
            <aside className="res-sidebar">
              <div>
                <h4 style={{fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".10em", color: "var(--ink-3)", fontWeight: 400, margin: "0 0 10px"}}>
                  Topics
                </h4>
                <div className="side-list">
                  {RES_TOPICS.map((tp) => (
                    <button key={tp.id}
                            className={`side-item ${topic === tp.id ? "active" : ""}`}
                            onClick={() => setTopic(tp.id)}>
                      <span>{tp.name}</span>
                      <span className="pill-num">{topicCounts[tp.id] || 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".10em", color: "var(--ink-3)", fontWeight: 400, margin: "0 0 10px"}}>
                  Level
                </h4>
                <div className="side-list">
                  {RES_LEVELS.map((lv) => (
                    <button key={lv.id}
                            className={`side-item ${level === lv.id ? "active" : ""}`}
                            onClick={() => setLevel(lv.id)}>
                      <span>{lv.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {(type !== "all" || topic !== "all" || level !== "all" || q) && (
                <button className="side-reset" onClick={() => { setType("all"); setTopic("all"); setLevel("all"); setQ(""); }}>
                  ← Reset all filters
                </button>
              )}

              <div style={{
                padding: 18,
                background: "var(--bg-2)",
                borderRadius: 12,
                border: "1px solid var(--line)",
              }}>
                <h4 style={{fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".10em", color: "var(--ink-3)", fontWeight: 400, margin: "0 0 8px"}}>
                  Can't find it?
                </h4>
                <p style={{fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", margin: "0 0 12px"}}>
                  Request a new guide or contribute one yourself.
                </p>
                <a className="link-arrow" href="#" style={{fontSize: 13}}>
                  Contribute <IconArrowR size={14}/>
                </a>
              </div>
            </aside>

            <div>
              {/* Continue reading strip (shown only when not filtering) */}
              {!isFiltering && (
                <div className="res-continue">
                  <div className="ico">
                    <IconPlay size={14}/>
                  </div>
                  <div className="text">
                    <strong>Pick up where you left off</strong>
                    <div className="sub">Migrate to the new Vault cluster endpoints · 3 min remaining</div>
                  </div>
                  <a className="link-arrow" href="#" style={{fontSize: 13}}>
                    Continue <IconArrowR size={14}/>
                  </a>
                </div>
              )}

              {/* Featured */}
              {!isFiltering && featured.length > 0 && (
                <React.Fragment>
                  <div style={{display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 14}}>
                    <h2 style={{fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0}}>Featured this week</h2>
                  </div>
                  <div className="res-featured">
                    <FeaturedCard article={featured[0]} variant="primary"/>
                    {featured.slice(1, 3).map((a) => (
                      <FeaturedCard key={a.id} article={a}/>
                    ))}
                  </div>
                </React.Fragment>
              )}

              {/* Learning paths inline section */}
              {!isFiltering && (
                <section style={{margin: "12px 0 32px"}}>
                  <div style={{display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 14}}>
                    <div>
                      <h2 style={{fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: "0 0 4px"}}>Learning paths</h2>
                      <p className="small" style={{color: "var(--ink-3)"}}>Sequenced guides for common goals.</p>
                    </div>
                    <a className="link-arrow" href="#" style={{fontSize: 13}}>Browse all <IconArrowR size={14}/></a>
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}>
                    {RES_PATHS.map((p) => <PathCard key={p.id} path={p}/>)}
                  </div>
                </section>
              )}

              {/* Article list */}
              <div style={{display: "flex", alignItems: "end", justifyContent: "space-between", marginTop: 8, marginBottom: 14}}>
                <h2 style={{fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0}}>
                  {isFiltering ? "Results" : "All articles"}
                </h2>
                <span className="small" style={{color: "var(--ink-3)", fontFamily: "var(--font-mono)", fontSize: 12}}>
                  {visible.length} of {allRest.length} articles
                </span>
              </div>

              {visible.length === 0 ? (
                <div className="no-results">
                  <div className="display-m">No articles match.</div>
                  <p>Try clearing filters or searching with a different term.</p>
                  <button className="btn btn-ghost" style={{marginTop: 16}}
                          onClick={() => { setType("all"); setTopic("all"); setLevel("all"); setQ(""); }}>
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="res-list">
                  {visible.map((a) => <ArticleRow key={a.id} article={a}/>)}
                </div>
              )}
            </div>
          </div>
        </div>

        <CTAStrip/>
      </main>
      <Footer/>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)}/>

      <TweaksPanel title="Stratus Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Brand"
            value={(PALETTES_RES.find(p => p.key === t.palette) || PALETTES_RES[0]).hex}
            onChange={(hex) => {
              const match = PALETTES_RES.find(p => p.hex.toLowerCase() === String(hex).toLowerCase());
              if (match) setTweak("palette", match.key);
            }}
            options={PALETTES_RES.map(p => p.hex)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio label="Density" value={t.density}
                      onChange={(v) => setTweak("density", v)}
                      options={["comfortable", "compact"]}/>
        </TweakSection>
        <TweakSection label="Toggles">
          <TweakToggle label="Mono eyebrows" value={t.monoEyebrows}
                       onChange={(v) => setTweak("monoEyebrows", v)}/>
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ResourcesApp />);
