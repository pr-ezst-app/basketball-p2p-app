import Icon from "@/components/ui/icon";

export type Section = "hub" | "stats" | "courts" | "games" | "teams" | "profile" | "chat";

export const navItems: { id: Section; icon: string; label: string }[] = [
  { id: "hub", icon: "LayoutDashboard", label: "Hub" },
  { id: "stats", icon: "BarChart3", label: "Stats" },
  { id: "courts", icon: "MapPin", label: "Courts" },
  { id: "games", icon: "Trophy", label: "Games" },
  { id: "teams", icon: "Users", label: "Teams" },
  { id: "profile", icon: "User", label: "Profile" },
  { id: "chat", icon: "MessageCircle", label: "Chat" },
];

interface AppShellProps {
  active: Section;
  setActive: (s: Section) => void;
  children: React.ReactNode;
}

export default function AppShell({ active, setActive, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 h-14 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center orange-glow">
            <span className="font-display font-bold text-primary-foreground text-sm">H</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-foreground">HOOPHUB</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`nav-item flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-body font-medium transition-all
                ${active === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
              {item.id === "chat" && <span className="ml-1 w-2 h-2 bg-primary rounded-full" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Bell" size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="font-display text-xs font-bold text-primary">MJ</span>
          </div>
        </div>
      </header>

      <div className="md:hidden sticky top-14 z-40 flex overflow-x-auto gap-1 px-3 py-2 border-b border-border bg-background/95 backdrop-blur-sm">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-body font-medium transition-all
              ${active === item.id
                ? "text-primary bg-primary/10 border border-primary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
          >
            <Icon name={item.icon} size={13} />
            {item.label}
          </button>
        ))}
      </div>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
