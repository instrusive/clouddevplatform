/* Shared page chrome — TopNav, SearchOverlay, useScrollSpy.
   Used by both the homepage (app.jsx) and the catalog (catalog.jsx). */

const { useState: useStateChrome, useRef: useRefChrome, useEffect: useEffectChrome, useMemo: useMemoChrome } = React;

/* ------- TopNav ------- */
function TopNav({ activeId, onOpenSearch, mode = "scroll", currentPage }) {
  const links = [
    { id: "welcome", label: "Welcome", href: "index.html#welcome" },
    { id: "catalog", label: "Catalog", href: "catalog.html" },
    { id: "resources", label: "Resources", href: "resources.html" },
  ];

  const goTo = (l) => (e) => {
    if (mode === "scroll" && l.href.startsWith("index.html#")) {
      e.preventDefault();
      const el = document.getElementById(l.id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  /* Halftone stacked-dots logo mark */
  const LogoMark = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
      <circle cx="3"  cy="3"  r="1.7"/>
      <circle cx="9"  cy="3"  r="1.7"/>
      <circle cx="15" cy="3"  r="1.7"/>
      <circle cx="3"  cy="9"  r="1.7"/>
      <circle cx="9"  cy="9"  r="1.7"/>
      <circle cx="3"  cy="15" r="1.7"/>
    </svg>
  );

  return (
    <header className="topnav">
      <div className="shell topnav-inner">
        <a href="index.html" className="logo">
          <div className="logo-mark"><LogoMark/></div>
          atlas
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => {
            const isActive = (currentPage && currentPage === l.id) || (mode === "scroll" && activeId === l.id);
            return (
              <a key={l.id} href={l.href} onClick={goTo(l)}
                 className={`nav-link ${isActive ? "active" : ""}`}>
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-right">
          <button className="search-trigger" onClick={onOpenSearch} aria-label="Open search">
            <IconSearch size={16}/>
            <span>Search Atlas…</span>
            <kbd>⌘K</kbd>
          </button>
          <button className="btn btn-ghost" style={{padding: "8px 12px"}} aria-label="Notifications">
            <IconBell size={16}/>
          </button>
          <div className="avatar" title="Jane Doe">JD</div>
        </div>
      </div>
    </header>
  );
}

/* ------- Search Overlay ------- */
function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useStateChrome("");
  const [active, setActive] = useStateChrome(0);
  const inputRef = useRefChrome(null);

  const filtered = useMemoChrome(() => {
    const term = q.trim().toLowerCase();
    if (!term) return SEARCH_INDEX;
    return SEARCH_INDEX.filter(i =>
      i.name.toLowerCase().includes(term) || i.cat.toLowerCase().includes(term)
    );
  }, [q]);

  const groups = useMemoChrome(() => {
    const m = {};
    filtered.forEach(i => { (m[i.cat] = m[i.cat] || []).push(i); });
    return Object.entries(m);
  }, [filtered]);

  useEffectChrome(() => {
    if (open) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
      setQ("");
      setActive(0);
    }
  }, [open]);

  useEffectChrome(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(filtered.length - 1, i + 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
      if (e.key === "Enter") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length, onClose]);

  if (!open) return null;

  const icoFor = (cat) => ({
    Platforms: <IconCloud size={14}/>, Utilities: <IconBolt size={14}/>,
    Dashboards: <IconChart size={14}/>, Tools: <IconTerm size={14}/>,
    Docs: <IconBook size={14}/>, Programs: <IconStack size={14}/>,
  }[cat]);
  const colorFor = (cat) => ({
    Platforms: "var(--tile-2)", Utilities: "var(--tile-1)",
    Dashboards: "var(--tile-3)", Tools: "var(--tile-4)",
    Docs: "var(--tile-5)", Programs: "var(--tile-6)",
  }[cat] || "var(--bg-2)");

  let runIdx = -1;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <div className="input-row">
          <IconSearch size={20} stroke="var(--ink-3)"/>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Search platforms, services, runbooks, programs…"/>
          <span className="esc">esc</span>
        </div>
        <div className="search-results">
          {groups.length === 0 && (
            <div style={{padding: "32px 16px", textAlign: "center", color: "var(--ink-3)"}}>
              No results for "{q}".
            </div>
          )}
          {groups.map(([cat, items]) => (
            <div key={cat}>
              <div className="search-section">{cat}</div>
              {items.map((it) => {
                runIdx++;
                const isActive = runIdx === active;
                return (
                  <div key={it.name}
                       className={`search-item ${isActive ? "active" : ""}`}
                       onMouseEnter={() => setActive(runIdx)}
                       onClick={onClose}>
                    <div className="si-ico" style={{background: colorFor(cat)}}>{icoFor(cat)}</div>
                    <div>
                      <div className="si-name">{it.name}</div>
                      <div className="si-sub">{it.cat}</div>
                    </div>
                    <span className="si-meta">{it.meta}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{padding: "10px 14px", borderTop: "1px solid var(--line)",
                     display: "flex", justifyContent: "space-between", fontSize: 11,
                     color: "var(--ink-3)", fontFamily: "var(--font-mono)"}}>
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}

/* ------- Scroll spy ------- */
function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useStateChrome(ids[0]);
  useEffectChrome(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

/* ------- Cmd-K listener helper ------- */
function useCmdK(setSearchOpen) {
  useEffectChrome(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);
}

Object.assign(window, { TopNav, SearchOverlay, useScrollSpy, useCmdK });
