import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import type { Section } from "@/components/AppShell";

const HERO_IMAGE = "https://cdn.ezst.app/projects/f5987fdd-75b4-489e-b501-d651b799f4dd/files/098ccfb6-1c0c-4a2a-a8b0-a317d3dd26be.jpg";

const quickStats = [
  { label: "PPG", value: "24.8", delta: "+2.1", icon: "Flame" },
  { label: "APG", value: "7.3", delta: "+0.5", icon: "Zap" },
  { label: "RPG", value: "11.2", delta: "+1.8", icon: "TrendingUp" },
  { label: "FG%", value: "54.2", delta: "+3.4", icon: "Target" },
];

const upcomingGames = [
  { opponent: "Chicago Bulls", date: "May 23", time: "19:30", venue: "United Center", home: true },
  { opponent: "LA Lakers", date: "May 27", time: "21:00", venue: "Away", home: false },
  { opponent: "Miami Heat", date: "June 1", time: "18:00", venue: "Home Arena", home: true },
];

export type LobbyState = "idle" | "waiting" | "ready" | "live";

export const ROSTER_NAMES = ["M. Johnson", "D. Cole", "J. Brooks", "T. Washington", "D. Miller"];
export const OPP_NAMES = ["K. Durant", "Z. LaVine", "D. DeRozan", "N. Vucevic", "A. Drummond"];

interface HubSectionProps {
  setActive: (s: Section) => void;
  lobbyState: LobbyState;
  setLobbyState: (s: LobbyState) => void;
  playersReady: number;
  gameScore: { home: number; away: number };
  gameClock: string;
  gameQuarter: number;
  onStartGame: () => void;
  onEnterMatchup: () => void;
}

export default function HubSection({
  setActive,
  lobbyState,
  setLobbyState,
  playersReady,
  gameScore,
  gameClock,
  gameQuarter,
  onStartGame,
  onEnterMatchup,
}: HubSectionProps) {
  return (
    <div className="animate-fade-in space-y-6">

      {/* LIVE GAME SCREEN — fullscreen overlay */}
      {lobbyState === "live" && (
        <div className="animate-fade-in fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="live-dot" />
              <span className="font-display font-bold text-sm uppercase text-foreground">Live Game</span>
            </div>
            <Badge className="bg-red-500/15 text-red-400 border-red-500/30 text-xs">Q{gameQuarter} · {gameClock}</Badge>
            <button onClick={() => setLobbyState("idle")} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body flex items-center gap-1">
              <Icon name="X" size={14} /> Exit
            </button>
          </div>

          <div className="relative flex items-center justify-between px-6 py-8 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
            <div className="text-center flex-1">
              <p className="text-muted-foreground text-xs font-body uppercase tracking-widest mb-1">Brooklyn Ballers</p>
              <div className={`font-display font-black text-7xl transition-all duration-300 ${gameScore.home > gameScore.away ? "text-primary" : "text-foreground"}`}>
                {gameScore.home}
              </div>
            </div>
            <div className="text-center px-6">
              <div className="font-display text-muted-foreground text-2xl font-bold">VS</div>
              <div className="text-xs text-muted-foreground font-body mt-1">United Center</div>
            </div>
            <div className="text-center flex-1">
              <p className="text-muted-foreground text-xs font-body uppercase tracking-widest mb-1">Chicago Bulls</p>
              <div className={`font-display font-black text-7xl transition-all duration-300 ${gameScore.away > gameScore.home ? "text-primary" : "text-foreground"}`}>
                {gameScore.away}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 divide-x divide-border">
            <div className="p-4">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Your Team</p>
              <div className="space-y-2">
                {ROSTER_NAMES.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <span className="font-body text-sm text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Opponents</p>
              <div className="space-y-2">
                {OPP_NAMES.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xs font-bold text-muted-foreground">{i + 1}</span>
                    </div>
                    <span className="font-body text-sm text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-52 md:h-72">
        <img src={HERO_IMAGE} alt="Basketball Court" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10">
          <p className="text-primary text-sm font-body font-medium tracking-widest uppercase mb-2">Season 2026</p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-foreground uppercase leading-none mb-3">
            GAME ON<br />CHAMPION
          </h1>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-sm">
            Your next game is in <span className="text-primary font-semibold">2 days</span>. Keep the momentum.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="font-display font-bold text-2xl uppercase text-foreground mb-3 tracking-wide">Your Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((s, i) => (
            <div key={i} className="stat-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-xs font-body uppercase tracking-wider">{s.label}</span>
                <Icon name={s.icon} size={14} className="text-primary" />
              </div>
              <div className="font-display font-black text-3xl text-foreground">{s.value}</div>
              <div className="text-green-400 text-xs font-body mt-1">{s.delta} this month</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Games */}
      <div>
        <h2 className="font-display font-bold text-2xl uppercase text-foreground mb-3 tracking-wide">Upcoming Games</h2>
        <div className="space-y-3">

          {/* IDLE */}
          {lobbyState === "idle" && (
            <div className="rounded-2xl border border-primary/25 overflow-hidden bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/15 text-primary border-primary/25 text-xs">Next Game</Badge>
                  <span className="text-muted-foreground text-xs font-body">May 23 · 19:30</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-2 mx-auto">
                      <span className="font-display font-black text-lg text-primary">BB</span>
                    </div>
                    <p className="font-display font-bold text-sm text-foreground">Brooklyn<br />Ballers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-black text-3xl text-muted-foreground">VS</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">United Center</p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mb-2 mx-auto">
                      <span className="font-display font-black text-lg text-muted-foreground">CB</span>
                    </div>
                    <p className="font-display font-bold text-sm text-foreground">Chicago<br />Bulls</p>
                  </div>
                </div>
                <button
                  onClick={onStartGame}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-display font-bold text-base uppercase tracking-wide hover:bg-primary/90 active:scale-98 transition-all orange-glow"
                >
                  <Icon name="Play" size={16} />
                  Start Game
                </button>
              </div>
            </div>
          )}

          {/* WAITING */}
          {lobbyState === "waiting" && (
            <div className="rounded-2xl border border-primary/30 overflow-hidden">
              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="live-dot" />
                    <span className="font-display font-bold text-lg uppercase text-foreground">Waiting for players</span>
                  </div>
                  <button onClick={() => setLobbyState("idle")} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Cancel</button>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-body">Players confirmed</span>
                  <span className="font-display font-bold text-xl text-primary">{playersReady} <span className="text-muted-foreground text-base">/ 10</span></span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden mb-5">
                  <div className="progress-bar h-full transition-all duration-700 ease-out" style={{ width: `${(playersReady / 10) * 100}%` }} />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`h-10 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all duration-500 ${i < playersReady ? "bg-primary/20 border border-primary/35" : "bg-secondary border border-border"}`}>
                      <Icon name={i < playersReady ? "Check" : "User"} size={13} className={i < playersReady ? "text-primary" : "text-muted-foreground"} />
                      <span className={`text-xs font-display font-bold ${i < playersReady ? "text-primary" : "text-muted-foreground"}`}>{i < 5 ? "BB" : "CB"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* READY */}
          {lobbyState === "ready" && (
            <div className="rounded-2xl border border-green-500/40 overflow-hidden bg-gradient-to-br from-green-500/8 to-transparent animate-scale-in">
              <div className="px-5 py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle" size={32} className="text-green-400" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase text-green-400 mb-1">All Players Ready</h3>
                <p className="text-muted-foreground text-sm font-body mb-6">10/10 confirmed · Brooklyn Ballers vs Chicago Bulls</p>
                <button
                  onClick={onEnterMatchup}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3.5 rounded-xl font-display font-bold text-base uppercase tracking-wide hover:bg-green-500/90 active:scale-98 transition-all"
                  style={{ boxShadow: "0 0 24px hsla(142, 71%, 45%, 0.3)" }}
                >
                  <Icon name="Gamepad2" size={18} />
                  Enter Matchup
                </button>
                <button onClick={() => setLobbyState("idle")} className="mt-2 w-full py-2 text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Other upcoming games */}
          {upcomingGames.slice(1).map((g, i) => (
            <div key={i} className="stat-card rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="Swords" size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">vs {g.opponent}</p>
                  <p className="text-muted-foreground text-xs">{g.venue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary font-display font-bold text-base">{g.time}</p>
                <p className="text-muted-foreground text-xs">{g.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display font-bold text-2xl uppercase text-foreground mb-3 tracking-wide">Quick Actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "Find Court", icon: "MapPin", section: "courts" as Section },
            { label: "Live Scores", icon: "Activity", section: "games" as Section },
            { label: "Team Chat", icon: "MessageCircle", section: "chat" as Section },
            { label: "My Stats", icon: "BarChart3", section: "stats" as Section },
            { label: "Roster", icon: "Users", section: "teams" as Section },
            { label: "Profile", icon: "User", section: "profile" as Section },
          ].map((a, i) => (
            <button key={i} onClick={() => setActive(a.section)} className="stat-card rounded-xl p-3 flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name={a.icon} size={18} className="text-primary" />
              </div>
              <span className="text-xs font-body text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
