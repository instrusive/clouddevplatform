/* Inline SVG icons. Stroke-based 1.5px, 20x20 default. */

const Icon = ({ children, size = 20, stroke = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={stroke}
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconSearch = (p) => <Icon {...p}><circle cx="9" cy="9" r="6"/><path d="m14 14 3 3"/></Icon>;
const IconArrowUR = (p) => <Icon {...p}><path d="M6 14 14 6"/><path d="M7 6h7v7"/></Icon>;
const IconArrowR = (p) => <Icon {...p}><path d="M4 10h12"/><path d="m12 5 5 5-5 5"/></Icon>;
const IconArrowL = (p) => <Icon {...p}><path d="M16 10H4"/><path d="m8 5-5 5 5 5"/></Icon>;
const IconChev = (p) => <Icon {...p}><path d="m5 8 5 5 5-5"/></Icon>;
const IconBell = (p) => <Icon {...p}><path d="M4.5 14h11l-1-2V9a4.5 4.5 0 0 0-9 0v3l-1 2Z"/><path d="M8.5 16.5a1.5 1.5 0 0 0 3 0"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z"/></Icon>;
const IconCube = (p) => <Icon {...p}><path d="M10 2 3 6v8l7 4 7-4V6l-7-4Z"/><path d="M3 6l7 4 7-4"/><path d="M10 18V10"/></Icon>;
const IconStack = (p) => <Icon {...p}><path d="m10 2 8 4-8 4-8-4 8-4Z"/><path d="m2 10 8 4 8-4"/><path d="m2 14 8 4 8-4"/></Icon>;
const IconGrid = (p) => <Icon {...p}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></Icon>;
const IconBook = (p) => <Icon {...p}><path d="M4 4h7v13H4z"/><path d="M11 4h5v13h-5z"/><path d="M4 17h12"/></Icon>;
const IconChat = (p) => <Icon {...p}><path d="M3 4h14v9H8l-4 4V4Z"/></Icon>;
const IconCode = (p) => <Icon {...p}><path d="m6 6-4 4 4 4"/><path d="m14 6 4 4-4 4"/><path d="m12 4-4 12"/></Icon>;
const IconTerm = (p) => <Icon {...p}><rect x="2" y="3" width="16" height="14" rx="2"/><path d="m5 8 3 2-3 2"/><path d="M10 13h5"/></Icon>;
const IconShield = (p) => <Icon {...p}><path d="M10 2 4 4v6c0 4 6 8 6 8s6-4 6-8V4l-6-2Z"/></Icon>;
const IconChart = (p) => <Icon {...p}><path d="M3 17V5"/><path d="M17 17H3"/><rect x="6" y="11" width="2" height="4"/><rect x="10" y="8" width="2" height="7"/><rect x="14" y="5" width="2" height="10"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="m4 10 4 4 8-8"/></Icon>;
const IconPlus = (p) => <Icon {...p}><path d="M10 4v12"/><path d="M4 10h12"/></Icon>;
const IconClose = (p) => <Icon {...p}><path d="m5 5 10 10"/><path d="M15 5 5 15"/></Icon>;
const IconSlack = (p) => <Icon {...p}><rect x="3" y="8" width="5" height="2" rx="1"/><rect x="12" y="10" width="5" height="2" rx="1"/><rect x="8" y="12" width="2" height="5" rx="1"/><rect x="10" y="3" width="2" height="5" rx="1"/></Icon>;
const IconPlay = (p) => <Icon {...p}><path d="M6 4v12l10-6L6 4Z"/></Icon>;
const IconLink = (p) => <Icon {...p}><path d="M8 12a3 3 0 0 0 0-4l-2-2a3 3 0 1 0-4 4l1 1"/><path d="M12 8a3 3 0 0 0 0 4l2 2a3 3 0 1 0 4-4l-1-1"/></Icon>;
const IconDB = (p) => <Icon {...p}><ellipse cx="10" cy="5" rx="6" ry="2"/><path d="M4 5v10c0 1.1 2.7 2 6 2s6-.9 6-2V5"/><path d="M4 10c0 1.1 2.7 2 6 2s6-.9 6-2"/></Icon>;
const IconCloud = (p) => <Icon {...p}><path d="M6 14h9a3 3 0 0 0 0-6 4 4 0 0 0-7.6-1.2A3 3 0 0 0 6 14Z"/></Icon>;
const IconGlobe = (p) => <Icon {...p}><circle cx="10" cy="10" r="7"/><path d="M3 10h14"/><path d="M10 3c2 2.5 3 5 3 7s-1 4.5-3 7c-2-2.5-3-5-3-7s1-4.5 3-7Z"/></Icon>;
const IconBuild = (p) => <Icon {...p}><path d="m2 17 7-7 3 3 6-6"/><path d="M13 7h5v5"/></Icon>;
const IconKey = (p) => <Icon {...p}><circle cx="6" cy="14" r="3"/><path d="m8 12 9-9"/><path d="m14 6 2 2"/></Icon>;

Object.assign(window, {
  Icon, IconSearch, IconArrowUR, IconArrowR, IconArrowL, IconChev, IconBell,
  IconBolt, IconCube, IconStack, IconGrid, IconBook, IconChat, IconCode,
  IconTerm, IconShield, IconChart, IconCheck, IconPlus, IconClose, IconSlack,
  IconPlay, IconLink, IconDB, IconCloud, IconGlobe, IconBuild, IconKey
});
