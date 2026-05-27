// ---------------------------------------------------------------------------
// Dock app definitions – each entry maps to an icon in /public/doc-icons/
// ---------------------------------------------------------------------------
export const dockApps = [
  { id: "github", name: "GitHub", icon: "github.svg", canOpen: true },
  { id: "note", name: "Notes", icon: "note.svg", canOpen: true },
  { id: "resume", name: "Resume", icon: "pdf.svg", canOpen: true },
  { id: "calendar", name: "Calendar", icon: "calender.svg", canOpen: true },
  { id: "spotify", name: "Spotify", icon: "spotify.svg", canOpen: true },
  { id: "mail", name: "Mail", icon: "mail.svg", canOpen: true },
  { id: "link", name: "Links", icon: "link.svg", canOpen: true },
  { id: "cli", name: "Terminal", icon: "cli.svg", canOpen: true },
];

// ---------------------------------------------------------------------------
// Window z-index management
// ---------------------------------------------------------------------------
export const INITIAL_Z_INDEX = 1000;

// ---------------------------------------------------------------------------
// Default window state – generated from dockApps for the Zustand store
// ---------------------------------------------------------------------------
export const WINDOW_CONFIG = Object.fromEntries(
  dockApps.map(({ id }) => [
    id,
    { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  ]),
);

// ---------------------------------------------------------------------------
// Tech stack – shown in the Terminal / CLI window
// ---------------------------------------------------------------------------
export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "Angular", "GSAP"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Styling", items: ["Tailwind CSS", "SCSS", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Spring Boot"] },
  { category: "Databases", items: ["MongoDB", "MySQL"] },
];
