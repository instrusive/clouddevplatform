/* ============================================
   Cloud Catalog — page app
   ============================================ */

const { useState: useStateCat, useEffect: useEffectCat, useMemo: useMemoCat } = React;

const PALETTES_CAT = [
  { key: "cobalt", hex: "#2148E5" },
  { key: "coral",  hex: "#FE5F2D" },
  { key: "indigo", hex: "#5A3CE0" },
];

const CATALOG_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cobalt",
  "density": "comfortable",
  "monoEyebrows": true,
  "defaultView": "grid"
}/*EDITMODE-END*/;

/* read ?tab from URL */
function getInitialTab() {
  if (typeof window === "undefined") return "private";
  const p = new URLSearchParams(window.location.search);
  const t = (p.get("tab") || "").toLowerCase();
  return t === "public" ? "public" : "private";
}

/* ------- Active context bar ------- */
function ContextBar({ activeSid, onSelectSid }) {
  const sids = ["sid-1234", "sid-4567", "sid-8910", "sid-1112"];
  return (
    <div className="context-bar">
      <div style={{display: "flex", alignItems: "center", gap: 10}}>
        <span className="ctx-lbl">Active CAR ID</span>
        <span className="ctx-value">600001383</span>
      </div>
      <div className="ctx-divider"></div>
      <div style={{display: "flex", alignItems: "center", gap: 10}}>
        <span className="ctx-lbl">SID</span>
        <div className="ctx-sids">
          {sids.map((s) => (
            <button key={s}
                    className={`ctx-sid ${s === activeSid ? "active" : ""}`}
                    onClick={() => onSelectSid(s)}>{s}</button>
          ))}
        </div>
      </div>
      <a href="#" className="ctx-action">
        Manage onboarding <IconArrowUR size={14}/>
      </a>
    </div>
  );
}

/* ------- Product card ------- */
function ProductCard({ p, onOrder, showProvider }) {
  const providerCode = p.provider ? CAT_PROVIDERS.find(x => x.id === p.provider)?.code : "HELIX";
  const catName = CAT_CATEGORIES.find(c => c.id === p.cat)?.name || p.cat;
  return (
    <article className={`prod-card ${p.eligible ? "" : "ineligible"}`}>
      <div className="prod-body">
        <div style={{display: "flex", alignItems: "center", gap: 12, minWidth: 0}}>
          <div className="prod-glyph" style={{flexShrink: 0}}>{p.glyph}</div>
          <h3 className="prod-name" style={{minWidth: 0, overflow: "hidden", textOverflow: "ellipsis"}}>{p.name}</h3>
        </div>

        <div className="prod-meta-row" style={{flexWrap: "wrap"}}>
          <span className="prod-cat">{catName}</span>
          {showProvider && p.provider && <span className="prod-prov">{providerCode}</span>}
          {!p.eligible && (
            <span className="prod-warn">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M6 1l5.5 9.5h-11L6 1z" fill="#b35400"/>
                <path d="M6 5v2.5" stroke="#fff1e2" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="6" cy="9" r=".7" fill="#fff1e2"/>
              </svg>
              Not eligible
              <span className="prod-warn-tip">
                This service isn't enabled for the selected CAR ID and SID. Update onboarding configuration to provision it.
              </span>
            </span>
          )}
        </div>

        <p className="prod-blurb">{p.blurb}</p>

        <div className="prod-actions">
          {p.eligible ? (
            <React.Fragment>
              <button className="prod-icon-btn" aria-label="Launch">
                <IconArrowUR size={16}/>
                <span className="tip">Launch</span>
              </button>
              <button className="prod-icon-btn primary" onClick={() => onOrder(p)} aria-label="Order">
                <IconPlus size={16}/>
                <span className="tip">Order</span>
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="prod-icon-btn" onClick={() => onOrder(p)} aria-label="View details">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="7"/>
                  <path d="M10 6.5h.01"/>
                  <path d="M10 9v5"/>
                </svg>
                <span className="tip">Details</span>
              </button>
              <button className="prod-icon-btn primary" disabled aria-label="Order (unavailable)">
                <IconPlus size={16}/>
                <span className="tip">Order</span>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductRow({ p, onOrder, showProvider }) {
  const providerCode = p.provider ? CAT_PROVIDERS.find(x => x.id === p.provider)?.code : "HELIX";
  const catName = CAT_CATEGORIES.find(c => c.id === p.cat)?.name || p.cat;
  return (
    <div className={`prod-row ${p.eligible ? "" : "ineligible"}`}>
      <div className="prod-glyph" style={{background: p.tile}}>{p.glyph}</div>
      <div>
        <div className="prod-name" style={{fontSize: 15}}>{p.name}</div>
        <div className="prod-meta-row" style={{marginTop: 4}}>
          <span className="prod-cat">{catName}</span>
          {showProvider && <span className="prod-prov">{providerCode}</span>}
        </div>
      </div>
      <p className="prod-blurb">{p.blurb}</p>
      <div>
        {!p.eligible && (
          <span className="prod-warn" style={{fontSize: 11}}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="#b35400">
              <path d="M6 1l5.5 9.5h-11L6 1z"/>
            </svg>
            Not eligible
          </span>
        )}
      </div>
      <div style={{display: "flex", gap: 6, justifyContent: "flex-end"}}>
        <button className="prod-icon-btn" aria-label="Launch">
          <IconArrowUR size={16}/>
          <span className="tip">Launch</span>
        </button>
        <button className="prod-icon-btn primary" disabled={!p.eligible}
                onClick={() => onOrder(p)} aria-label={p.eligible ? "Order" : "View details"}>
          <IconPlus size={16}/>
          <span className="tip">{p.eligible ? "Order" : "Details"}</span>
        </button>
      </div>
    </div>
  );
}

/* ------- Order drawer ------- */
function OrderDrawer({ product, onClose }) {
  const [name, setName] = useStateCat(product ? product.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-prod" : "");
  const [region, setRegion] = useStateCat("us-east-1");
  const [tier, setTier] = useStateCat("medium");
  const [env, setEnv] = useStateCat("development");

  const tiers = [
    { id: "small",  name: "Small",  spec: "2 vCPU · 8 GB", cost: "$0.18 / hr" },
    { id: "medium", name: "Medium", spec: "4 vCPU · 16 GB", cost: "$0.42 / hr" },
    { id: "large",  name: "Large",  spec: "8 vCPU · 32 GB", cost: "$0.86 / hr" },
  ];

  useEffectCat(() => {
    if (product) {
      setName(product.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-prod");
    }
  }, [product]);

  if (!product) return null;

  const eligible = product.eligible;
  const monthly = ({ small: "131", medium: "306", large: "627" })[tier];

  return (
    <React.Fragment>
      <div className="drawer-overlay" onClick={onClose}></div>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Order ${product.name}`}>
        <header className="drawer-head">
          <div className="prod-glyph" style={{background: product.tile, width: 44, height: 44, fontSize: 16}}>{product.glyph}</div>
          <div>
            <div style={{fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-2)"}}>
              {eligible ? "Order service" : "Service details"}
            </div>
            <h3 style={{fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: "-0.01em"}}>{product.name}</h3>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <IconClose size={16}/>
          </button>
        </header>

        <div className="drawer-body">
          {!eligible && (
            <div style={{
              padding: "14px 16px", borderRadius: 12, background: "#fff1e2",
              color: "#7a3a00", fontSize: 13, lineHeight: 1.5,
              display: "flex", gap: 12, alignItems: "flex-start"
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{flexShrink: 0, marginTop: 1}}>
                <path d="M9 2l7 12H2L9 2z" fill="#b35400"/>
                <path d="M9 7v3.5" stroke="#fff1e2" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="12.5" r="1" fill="#fff1e2"/>
              </svg>
              <div>
                <div style={{fontWeight: 600, marginBottom: 4}}>Service not enabled for this configuration</div>
                <div>This service isn't currently available for CAR ID <strong>600001383</strong> with SID <strong>sid-1234</strong>. Update your onboarding configuration to enable it.</div>
              </div>
            </div>
          )}

          <div className="drawer-section">
            <h5>About</h5>
            <p className="body" style={{fontSize: 14}}>{product.blurb}</p>
          </div>

          <div className="drawer-section">
            <h5>Configuration</h5>
            <div className="drawer-field">
              <label>Instance name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} disabled={!eligible}/>
            </div>
            <div className="drawer-field">
              <label>Environment</label>
              <select value={env} onChange={(e) => setEnv(e.target.value)} disabled={!eligible}>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
            <div className="drawer-field">
              <label>Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} disabled={!eligible}>
                <option value="us-east-1">us-east-1 · N. Virginia</option>
                <option value="us-west-2">us-west-2 · Oregon</option>
                <option value="eu-west-1">eu-west-1 · Ireland</option>
                <option value="ap-southeast-1">ap-southeast-1 · Singapore</option>
              </select>
            </div>
          </div>

          <div className="drawer-section">
            <h5>Size tier</h5>
            <div className="tier-grid">
              {tiers.map((tr) => (
                <button key={tr.id}
                        className={`tier-card ${tier === tr.id ? "active" : ""}`}
                        onClick={() => eligible && setTier(tr.id)}
                        disabled={!eligible}>
                  <div className="tier-name">{tr.name}</div>
                  <div className="tier-spec">{tr.spec}</div>
                  <div className="tier-cost">{tr.cost}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="drawer-section">
            <h5>Review</h5>
            <div className="review-card">
              <div className="review-row"><span className="lbl">Service</span><span className="val">{product.name}</span></div>
              <div className="review-row"><span className="lbl">Environment</span><span className="val">{env}</span></div>
              <div className="review-row"><span className="lbl">Region</span><span className="val">{region}</span></div>
              <div className="review-row"><span className="lbl">Tier</span><span className="val">{tier}</span></div>
              <div className="review-row total"><span className="lbl">Est. monthly</span><span className="val">${monthly}.00</span></div>
            </div>
          </div>
        </div>

        <footer className="drawer-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{flex: 1, justifyContent: "center"}}
                  disabled={!eligible}>
            {eligible ? "Provision service" : "Service unavailable"}
            {eligible && <IconArrowR size={14}/>}
          </button>
        </footer>
      </aside>
    </React.Fragment>
  );
}

/* ------- Catalog page app ------- */
function CatalogApp() {
  const [t, setTweak] = useTweaks(CATALOG_DEFAULTS);
  const [searchOpen, setSearchOpen] = useStateCat(false);
  const [tab, setTab] = useStateCat(getInitialTab());
  const [cat, setCat] = useStateCat("all");
  const [prov, setProv] = useStateCat("all");
  const [q, setQ] = useStateCat("");
  const [view, setView] = useStateCat(t.defaultView || "grid");
  const [activeSid, setActiveSid] = useStateCat("sid-1234");
  const [orderProduct, setOrderProduct] = useStateCat(null);

  useEffectCat(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-eyebrow", t.monoEyebrows ? "on" : "off");
  }, [t.palette, t.density, t.monoEyebrows]);

  useCmdK(setSearchOpen);

  // when tab changes, reset category/provider
  useEffectCat(() => {
    setCat("all");
    setProv("all");
    // update URL
    const url = new URL(window.location);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  }, [tab]);

  const allProducts = tab === "private" ? PRIVATE_PRODUCTS : PUBLIC_PRODUCTS;

  // category counts
  const categoryCounts = useMemoCat(() => {
    const counts = { all: allProducts.length };
    CAT_CATEGORIES.forEach(c => {
      if (c.id !== "all") counts[c.id] = allProducts.filter(p => p.cat === c.id).length;
    });
    return counts;
  }, [allProducts]);

  // provider counts (public only)
  const providerCounts = useMemoCat(() => {
    if (tab !== "public") return {};
    const counts = { all: allProducts.length };
    CAT_PROVIDERS.forEach(pp => {
      if (pp.id !== "all") counts[pp.id] = allProducts.filter(p => p.provider === pp.id).length;
    });
    return counts;
  }, [allProducts, tab]);

  // filtered products
  const visible = useMemoCat(() => {
    let arr = allProducts;
    if (cat !== "all") arr = arr.filter(p => p.cat === cat);
    if (tab === "public" && prov !== "all") arr = arr.filter(p => p.provider === prov);
    if (q.trim()) {
      const term = q.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(term) || p.blurb.toLowerCase().includes(term));
    }
    return arr;
  }, [allProducts, cat, prov, q, tab]);

  // close drawer on Esc
  useEffectCat(() => {
    if (!orderProduct) return;
    const onKey = (e) => { if (e.key === "Escape") setOrderProduct(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [orderProduct]);

  // filter visible categories to those with products in current scope
  const visibleCategoryList = useMemoCat(() => {
    if (tab === "public" && prov !== "all") {
      const subset = allProducts.filter(p => p.provider === prov);
      const usedCats = new Set(subset.map(p => p.cat));
      return CAT_CATEGORIES.filter(c => c.id === "all" || usedCats.has(c.id));
    }
    const usedCats = new Set(allProducts.map(p => p.cat));
    return CAT_CATEGORIES.filter(c => c.id === "all" || usedCats.has(c.id));
  }, [allProducts, tab, prov]);

  return (
    <React.Fragment>
      <TopNav onOpenSearch={() => setSearchOpen(true)} mode="cross-page" currentPage="catalog"/>
      <main>
        <div className="shell">
          {/* breadcrumbs */}
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span className="sep">/</span>
            <span style={{color: "var(--ink)"}}>Cloud Catalog</span>
          </nav>

          {/* hero */}
          <header className="cat-hero">
            <h1>Cloud Catalog</h1>
            <p className="body">
              Browse every managed service available on Stratus. Order, configure and launch
              in minutes — guardrails, IAM and observability come built in.
            </p>

            <div className="cat-tabs" role="tablist">
              <button role="tab" aria-selected={tab === "private"}
                      className={`cat-tab ${tab === "private" ? "active" : ""}`}
                      onClick={() => setTab("private")}>
                Private Cloud
                <span className="count">{PRIVATE_PRODUCTS.length}</span>
              </button>
              <button role="tab" aria-selected={tab === "public"}
                      className={`cat-tab ${tab === "public" ? "active" : ""}`}
                      onClick={() => setTab("public")}>
                Public Cloud
                <span className="count">{PUBLIC_PRODUCTS.length}</span>
              </button>
            </div>
          </header>

          {/* context bar */}
          <ContextBar activeSid={activeSid} onSelectSid={setActiveSid}/>

          {/* toolbar */}
          <div className="cat-toolbar">
            <div className="cat-search">
              <IconSearch size={16} stroke="var(--ink-3)"/>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${tab === "private" ? "Helix" : "public cloud"} services…`}
              />
              {q && (
                <button className="clear" onClick={() => setQ("")} aria-label="Clear">
                  <IconClose size={14}/>
                </button>
              )}
            </div>

            {tab === "public" && (
              <div className="prov-pills" role="radiogroup" aria-label="Provider">
                {CAT_PROVIDERS.map((pp) => (
                  <button key={pp.id}
                          className={`prov-pill ${prov === pp.id ? "active" : ""}`}
                          onClick={() => setProv(pp.id)}>
                    {pp.code}
                  </button>
                ))}
              </div>
            )}

            <div className="view-toggle" role="radiogroup" aria-label="View">
              <button className={view === "grid" ? "active" : ""}
                      onClick={() => setView("grid")} aria-label="Grid view">
                <IconGrid size={16}/>
              </button>
              <button className={view === "list" ? "active" : ""}
                      onClick={() => setView("list")} aria-label="List view">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 5h12M4 10h12M4 15h12"/>
                </svg>
              </button>
            </div>

            <span className="result-count">{visible.length} of {allProducts.length} services</span>
          </div>

          {/* layout */}
          <div className="cat-layout">
            <aside className="cat-sidebar">
              <div className="side-section">
                <h4>Categories</h4>
                <div className="side-list">
                  {visibleCategoryList.map((c) => (
                    <button key={c.id}
                            className={`side-item ${cat === c.id ? "active" : ""}`}
                            onClick={() => setCat(c.id)}>
                      <span>{c.name}</span>
                      <span className="pill-num">{categoryCounts[c.id] || 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              {(cat !== "all" || (tab === "public" && prov !== "all") || q) && (
                <button className="side-reset" onClick={() => { setCat("all"); setProv("all"); setQ(""); }}>
                  ← Reset all filters
                </button>
              )}

              <div className="side-section" style={{
                padding: 18,
                background: "var(--tile-3)",
                borderRadius: "var(--r-md)",
              }}>
                <h4 style={{color: "var(--ink)"}}>Need a service?</h4>
                <p style={{fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", margin: "6px 0 12px"}}>
                  Don't see what you need? Request a new managed service from the platform team.
                </p>
                <a className="link-arrow" href="#" style={{fontSize: 13}}>
                  Request service <IconArrowR size={14}/>
                </a>
              </div>
            </aside>

            <div>
              {visible.length === 0 ? (
                <div className="no-results">
                  <div className="display-m">No services match.</div>
                  <p>Try clearing filters or searching with a different term.</p>
                  <button className="btn btn-ghost" style={{marginTop: 16}}
                          onClick={() => { setCat("all"); setProv("all"); setQ(""); }}>
                    Reset filters
                  </button>
                </div>
              ) : view === "grid" ? (
                <div className="prod-grid">
                  {visible.map((p) => (
                    <ProductCard key={p.id} p={p} onOrder={setOrderProduct} showProvider={tab === "public"}/>
                  ))}
                </div>
              ) : (
                <div className="prod-list">
                  {visible.map((p) => (
                    <ProductRow key={p.id} p={p} onOrder={setOrderProduct} showProvider={tab === "public"}/>
                  ))}
                </div>
              )}

              {tab === "public" && (
                <div className="onboard-banner">
                  <div className="ico"><IconBolt size={24}/></div>
                  <div className="body">
                    <h3>New to public cloud?</h3>
                    <p className="small" style={{marginTop: 4}}>
                      You must onboard a CAR ID before you can provision public cloud products.
                      Already onboarded? Check your status.
                    </p>
                  </div>
                  <div className="actions">
                    <button className="btn btn-primary">Start onboarding <IconArrowR size={14}/></button>
                    <button className="btn btn-ghost">Check status</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CTAStrip/>
      </main>
      <Footer/>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)}/>
      <OrderDrawer product={orderProduct} onClose={() => setOrderProduct(null)}/>

      <TweaksPanel title="Stratus Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Brand"
            value={(PALETTES_CAT.find(p => p.key === t.palette) || PALETTES_CAT[0]).hex}
            onChange={(hex) => {
              const match = PALETTES_CAT.find(p => p.hex.toLowerCase() === String(hex).toLowerCase());
              if (match) setTweak("palette", match.key);
            }}
            options={PALETTES_CAT.map(p => p.hex)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio label="Density" value={t.density}
                      onChange={(v) => setTweak("density", v)}
                      options={["comfortable", "compact"]}/>
          <TweakRadio label="Default view" value={t.defaultView}
                      onChange={(v) => { setTweak("defaultView", v); setView(v); }}
                      options={["grid", "list"]}/>
        </TweakSection>
        <TweakSection label="Toggles">
          <TweakToggle label="Mono eyebrows" value={t.monoEyebrows}
                       onChange={(v) => setTweak("monoEyebrows", v)}/>
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CatalogApp />);
