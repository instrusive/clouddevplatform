/* ============================================
   Stratus Cloud Platform — Homepage App
   (TopNav/SearchOverlay/useScrollSpy come from chrome.jsx)
   ============================================ */

const { useState, useEffect } = React;

const PALETTES = [
  { key: "cobalt", hex: "#2148E5" },
  { key: "coral",  hex: "#FE5F2D" },
  { key: "indigo", hex: "#5A3CE0" },
];

const STRATUS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cobalt",
  "density": "comfortable",
  "heroVariant": "search",
  "showAnnouncements": true,
  "monoEyebrows": true,
  "showHeroPattern": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(STRATUS_DEFAULTS);
  const [searchOpen, setSearchOpen] = useState(false);
  const activeId = useScrollSpy(["welcome", "resources", "announcements", "programs"]);

  // apply palette and density to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-eyebrow", t.monoEyebrows ? "on" : "off");
  }, [t.palette, t.density, t.monoEyebrows]);

  useCmdK(setSearchOpen);

  // toggle hero pattern via inline style on the .hero-pattern
  useEffect(() => {
    const el = document.querySelector(".hero-pattern");
    if (el) el.style.display = t.showHeroPattern ? "block" : "none";
  }, [t.showHeroPattern]);

  return (
    <React.Fragment>
      <TopNav activeId={activeId} onOpenSearch={() => setSearchOpen(true)} mode="scroll"/>
      <main>
        <Hero variant={t.heroVariant} onOpenSearch={() => setSearchOpen(true)}/>
        <QuickLaunch/>
        <OfferingsSection/>
        <Announcements enabled={t.showAnnouncements}/>
        <FeaturedTiles/>
        <Programs/>
        <ResourcesTriptych/>
        <CTAStrip/>
      </main>
      <Footer/>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)}/>

      <TweaksPanel title="Stratus Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Brand"
            value={(PALETTES.find(p => p.key === t.palette) || PALETTES[0]).hex}
            onChange={(hex) => {
              const match = PALETTES.find(p => p.hex.toLowerCase() === String(hex).toLowerCase());
              if (match) setTweak("palette", match.key);
            }}
            options={PALETTES.map(p => p.hex)}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={["comfortable", "compact"]}
          />
          <TweakRadio
            label="Hero CTA"
            value={t.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={["search", "actions"]}
          />
        </TweakSection>

        <TweakSection label="Toggles">
          <TweakToggle
            label="Announcements"
            value={t.showAnnouncements}
            onChange={(v) => setTweak("showAnnouncements", v)}
          />
          <TweakToggle
            label="Mono eyebrows"
            value={t.monoEyebrows}
            onChange={(v) => setTweak("monoEyebrows", v)}
          />
          <TweakToggle
            label="Hero pattern"
            value={t.showHeroPattern}
            onChange={(v) => setTweak("showHeroPattern", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
