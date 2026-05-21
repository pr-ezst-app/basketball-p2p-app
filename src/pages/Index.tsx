import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Section = "hub" | "stats" | "courts" | "games" | "teams" | "profile" | "chat";

const HERO_IMAGE = "https://cdn.ezst.app/projects/f5987fdd-75b4-489e-b501-d651b799f4dd/files/098ccfb6-1c0c-4a2a-a8b0-a317d3dd26be.jpg";

const navItems: { id: Section; icon: string; label: string }[] = [
  { id: "hub", icon: "LayoutDashboard", label: "Hub" },
  { id: "stats", icon: "BarChart3", label: "Stats" },
  { id: "courts", icon: "MapPin", label: "Courts" },
  { id: "games", icon: "Trophy", label: "Games" },
  { id: "teams", icon: "Users", label: "Teams" },
  { id: "profile", icon: "User", label: "Profile" },
  { id: "chat", icon: "MessageCircle", label: "Chat" },
];

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

const players = [
  { name: "Marcus Johnson", pos: "PG", ppg: 24.8, apg: 7.3, rpg: 5.1, fg: 54, rating: 92 },
  { name: "Darius Cole", pos: "SG", ppg: 21.4, apg: 3.2, rpg: 4.8, fg: 48, rating: 87 },
  { name: "Jaylen Brooks", pos: "SF", ppg: 18.7, apg: 2.8, rpg: 7.9, fg: 51, rating: 85 },
  { name: "Tyrone Washington", pos: "PF", ppg: 16.3, apg: 1.9, rpg: 11.2, fg: 59, rating: 83 },
  { name: "DeShawn Miller", pos: "C", ppg: 14.5, apg: 1.4, rpg: 13.7, fg: 62, rating: 81 },
];

const courts = [
  { name: "Riverside Sports Complex", distance: "0.8 km", available: true, indoor: true, lights: true, rating: 4.8 },
  { name: "Downtown Community Court", distance: "1.4 km", available: true, indoor: false, lights: true, rating: 4.5 },
  { name: "Eastside Recreation Center", distance: "2.1 km", available: false, indoor: true, lights: true, rating: 4.7 },
  { name: "Park Avenue Courts", distance: "2.9 km", available: true, indoor: false, lights: false, rating: 4.2 },
];

const liveGames = [
  { team1: "Hawks", team2: "Nets", score1: 87, score2: 82, quarter: "Q4", time: "3:42" },
  { team1: "Celtics", team2: "Bucks", score1: 64, score2: 71, quarter: "Q3", time: "8:15" },
];

const scheduledGames = [
  { team1: "Thunder", team2: "Warriors", date: "Today", time: "20:00", league: "NBA" },
  { team1: "Knicks", team2: "76ers", date: "Tomorrow", time: "19:30", league: "NBA" },
  { team1: "Raptors", team2: "Cavaliers", date: "May 24", time: "21:00", league: "NBA" },
];

const teams = [
  { name: "Brooklyn Ballers", members: 12, wins: 18, losses: 4, league: "City Pro League", rank: 1 },
  { name: "East Side Elite", members: 10, wins: 14, losses: 8, league: "City Pro League", rank: 4 },
  { name: "Crossover Kings", members: 11, wins: 11, losses: 11, league: "Amateur Division", rank: 2 },
];

const achievements = [
  { title: "Triple-Double King", desc: "3 triple-doubles in a row", icon: "Crown", unlocked: true },
  { title: "Sniper", desc: "60%+ FG% in 5 games", icon: "Target", unlocked: true },
  { title: "Floor General", desc: "Lead team in assists 10 games", icon: "Star", unlocked: true },
  { title: "Iron Man", desc: "Play 50 consecutive games", icon: "Shield", unlocked: false },
  { title: "Champion", desc: "Win a league title", icon: "Trophy", unlocked: false },
  { title: "MVP Award", desc: "Voted MVP by peers", icon: "Award", unlocked: false },
];

const initialMessages = [
  { id: 1, author: "Marcus J.", text: "Practice moved to 6pm tomorrow, confirm attendance 🏀", time: "10:24", own: false, avatar: "MJ" },
  { id: 2, author: "Me", text: "Confirmed, I'll be there", time: "10:31", own: true, avatar: "ME" },
  { id: 3, author: "Darius C.", text: "Same, bringing the new shoes 😤", time: "10:33", own: false, avatar: "DC" },
  { id: 4, author: "Coach Williams", text: "Great. Focus on pick-and-roll defense today. Watch the film I sent.", time: "10:45", own: false, avatar: "CW" },
  { id: 5, author: "Me", text: "Already watched it twice. That lane coverage was weak on our end.", time: "10:48", own: true, avatar: "ME" },
  { id: 6, author: "Tyrone W.", text: "Agreed. I got the gap assignment drills ready for warmup", time: "10:52", own: false, avatar: "TW" },
];

type LobbyState = "idle" | "waiting" | "ready";

export default function Index() {
  const [active, setActive] = useState<Section>("hub");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [lobbyState, setLobbyState] = useState<LobbyState>("idle");
  const [playersReady, setPlayersReady] = useState(3);

  const handleStartGame = () => {
    setLobbyState("waiting");
    setPlayersReady(3);
    const interval = setInterval(() => {
      setPlayersReady(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          setTimeout(() => setLobbyState("ready"), 400);
          return 10;
        }
        return prev + 1;
      });
    }, 600);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      author: "Me",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      own: true,
      avatar: "ME"
    }]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Header */}
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

      {/* Mobile Nav */}
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

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">

        {/* HUB */}
        {active === "hub" && (
          <div className="animate-fade-in space-y-6">
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

            <div>
              <h2 className="font-display font-bold text-2xl uppercase text-foreground mb-3 tracking-wide">Upcoming Games</h2>
              <div className="space-y-2">
                {/* Next game — interactive lobby card */}
                <div className={`rounded-2xl border overflow-hidden transition-all duration-500 ${lobbyState === "ready" ? "border-green-500/50" : lobbyState === "waiting" ? "border-primary/40" : "border-border"}`}>
                  {lobbyState === "idle" && (
                    <div className="px-5 py-4 flex items-center justify-between bg-gradient-to-r from-primary/8 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                          <Icon name="Swords" size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-body font-semibold text-sm text-foreground">vs Chicago Bulls</p>
                            <Badge className="bg-primary/15 text-primary border-primary/25 text-xs">Next</Badge>
                          </div>
                          <p className="text-muted-foreground text-xs">United Center · May 23 · 19:30</p>
                        </div>
                      </div>
                      <button
                        onClick={handleStartGame}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-semibold hover:bg-primary/90 active:scale-95 transition-all orange-glow"
                      >
                        <Icon name="Play" size={14} />
                        Start Game
                      </button>
                    </div>
                  )}

                  {lobbyState === "waiting" && (
                    <div className="px-5 py-5 bg-gradient-to-r from-primary/8 to-transparent">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="live-dot" />
                            <span className="font-display font-bold text-base uppercase text-foreground">Waiting for players</span>
                          </div>
                          <p className="text-muted-foreground text-xs font-body">Brooklyn Ballers vs Chicago Bulls · May 23</p>
                        </div>
                        <button onClick={() => setLobbyState("idle")} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Cancel</button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-body">Players confirmed</span>
                        <span className="font-display font-bold text-primary">{playersReady} / 10</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                        <div
                          className="progress-bar h-full transition-all duration-500 ease-out"
                          style={{ width: `${(playersReady / 10) * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className={`h-8 rounded-md flex items-center justify-center text-xs font-display font-bold transition-all duration-300 ${i < playersReady ? "bg-primary/20 border border-primary/35 text-primary" : "bg-secondary border border-border text-muted-foreground"}`}>
                            {i < playersReady ? <Icon name="Check" size={13} /> : <Icon name="User" size={13} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {lobbyState === "ready" && (
                    <div className="px-5 py-5 bg-gradient-to-r from-green-500/8 to-transparent text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Icon name="CheckCircle" size={20} className="text-green-400" />
                        <span className="font-display font-black text-xl uppercase text-green-400">All Players Ready!</span>
                      </div>
                      <p className="text-muted-foreground text-xs font-body mb-4">Brooklyn Ballers vs Chicago Bulls · 10/10 confirmed</p>
                      <div className="flex gap-3 justify-center">
                        <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg text-sm font-body font-semibold hover:bg-green-500/90 transition-all">
                          <Icon name="Gamepad2" size={15} />
                          Enter Matchup
                        </button>
                        <button onClick={() => setLobbyState("idle")} className="px-4 py-2.5 rounded-lg text-sm font-body text-muted-foreground border border-border hover:text-foreground hover:border-muted-foreground transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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
        )}

        {/* STATS */}
        {active === "stats" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-display font-black text-4xl uppercase">Player Stats</h1>
              <div className="flex gap-2">
                {["Season", "Month", "Game"].map((p, i) => (
                  <button key={p} className={`px-3 py-1 rounded-md text-xs font-body font-medium transition-all ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{p}</button>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card to-background p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-8 -translate-y-8" />
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-2">⭐ Top Performer</Badge>
                  <h2 className="font-display font-black text-3xl uppercase">Marcus Johnson</h2>
                  <p className="text-muted-foreground font-body text-sm">Point Guard · Brooklyn Ballers</p>
                </div>
                <div className="text-right">
                  <div className="font-display font-black text-5xl text-primary">92</div>
                  <div className="text-xs text-muted-foreground font-body">Rating</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
                {[["PPG", "24.8"], ["APG", "7.3"], ["RPG", "5.1"], ["FG%", "54%"]].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div className="font-display font-bold text-2xl text-foreground">{v}</div>
                    <div className="text-muted-foreground text-xs">{k}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl uppercase mb-3">Team Leaderboard</h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left px-4 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">Player</th>
                      <th className="text-center px-3 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">PPG</th>
                      <th className="text-center px-3 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">APG</th>
                      <th className="text-center px-3 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">RPG</th>
                      <th className="text-center px-3 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider hidden md:table-cell">FG%</th>
                      <th className="text-center px-3 py-2 text-xs text-muted-foreground font-body font-medium uppercase tracking-wider">RTG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, i) => (
                      <tr key={i} className={`border-t border-border hover:bg-secondary/30 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                              {i + 1}
                            </div>
                            <div>
                              <p className="font-body font-semibold text-sm text-foreground">{p.name}</p>
                              <p className="text-muted-foreground text-xs">{p.pos}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center font-display font-bold text-foreground">{p.ppg}</td>
                        <td className="px-3 py-3 text-center font-display font-bold text-foreground">{p.apg}</td>
                        <td className="px-3 py-3 text-center font-display font-bold text-foreground">{p.rpg}</td>
                        <td className="px-3 py-3 text-center hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className="progress-bar h-full" style={{ width: `${p.fg}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground w-7">{p.fg}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className={`font-display font-bold text-base ${p.rating >= 90 ? "text-primary" : p.rating >= 85 ? "text-yellow-400" : "text-muted-foreground"}`}>{p.rating}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* COURTS */}
        {active === "courts" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="font-display font-black text-4xl uppercase mb-1">Find Courts</h1>
              <p className="text-muted-foreground font-body text-sm">Nearby basketball courts with real-time availability</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-48 bg-secondary border border-border flex items-center justify-center">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle, hsl(28,95%,53%) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Icon name="Map" size={36} />
                <p className="font-body text-sm">Interactive map coming soon</p>
                <p className="text-xs">4 courts found within 3 km</p>
              </div>
              <div className="absolute top-4 left-4 bg-background/90 rounded-lg px-3 py-1.5 border border-border">
                <p className="text-xs font-body text-muted-foreground">Your location</p>
                <p className="font-body font-semibold text-sm text-foreground">Brooklyn, NY</p>
              </div>
            </div>

            <div className="space-y-3">
              {courts.map((c, i) => (
                <div key={i} className="stat-card rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-body font-semibold text-foreground">{c.name}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5">{c.distance} away</p>
                    </div>
                    <Badge className={`text-xs border ${c.available ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"}`}>
                      {c.available ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`flex items-center gap-1 text-xs font-body ${c.indoor ? "text-primary" : "text-muted-foreground"}`}>
                      <Icon name={c.indoor ? "Building2" : "Sun"} size={12} />
                      {c.indoor ? "Indoor" : "Outdoor"}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-body ${c.lights ? "text-primary" : "text-muted-foreground"}`}>
                      <Icon name="Lightbulb" size={12} />
                      {c.lights ? "Lights" : "No lights"}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-body text-yellow-400">
                      <Icon name="Star" size={12} />
                      {c.rating}
                    </span>
                    <button className="ml-auto flex items-center gap-1 text-xs text-primary font-body hover:text-primary/80 transition-colors">
                      <Icon name="Navigation" size={12} />
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAMES */}
        {active === "games" && (
          <div className="animate-fade-in space-y-6">
            <h1 className="font-display font-black text-4xl uppercase">Games</h1>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="live-dot" />
                <h2 className="font-display font-bold text-xl uppercase text-foreground">Live Now</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {liveGames.map((g, i) => (
                  <div key={i} className="stat-card rounded-xl p-5 border border-primary/15">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-red-500/15 text-red-400 border-red-500/30 text-xs">
                        LIVE · {g.quarter} {g.time}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-body">NBA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="font-display font-bold text-xl text-foreground">{g.team1}</p>
                      </div>
                      <div className="text-center px-4">
                        <div className="font-display font-black text-3xl">
                          <span className={g.score1 > g.score2 ? "text-primary" : "text-foreground"}>{g.score1}</span>
                          <span className="text-muted-foreground mx-1">·</span>
                          <span className={g.score2 > g.score1 ? "text-primary" : "text-foreground"}>{g.score2}</span>
                        </div>
                      </div>
                      <div className="text-center flex-1">
                        <p className="font-display font-bold text-xl text-foreground">{g.team2}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl uppercase text-foreground mb-3">Upcoming Schedule</h2>
              <div className="space-y-2">
                {scheduledGames.map((g, i) => (
                  <div key={i} className="stat-card rounded-xl px-4 py-3 flex items-center gap-4">
                    <div className="text-center w-16 flex-shrink-0">
                      <p className="text-primary font-display font-bold text-sm">{g.date}</p>
                      <p className="text-muted-foreground text-xs">{g.time}</p>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-body font-semibold text-foreground">{g.team1}</span>
                      <span className="text-muted-foreground text-xs mx-3 font-body">vs</span>
                      <span className="font-body font-semibold text-foreground">{g.team2}</span>
                    </div>
                    <Badge className="bg-secondary text-muted-foreground border-border text-xs">{g.league}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full rounded-xl border-2 border-dashed border-border hover:border-primary/40 py-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
              <Icon name="Plus" size={16} className="group-hover:text-primary transition-colors" />
              <span className="font-body text-sm">Schedule New Game</span>
            </button>
          </div>
        )}

        {/* TEAMS */}
        {active === "teams" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-display font-black text-4xl uppercase">Teams</h1>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-medium hover:bg-primary/90 transition-colors">
                <Icon name="Plus" size={14} />
                New Team
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {teams.map((t, i) => (
                <div key={i} className="stat-card rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                      <span className="font-display font-black text-lg text-primary">{t.name.charAt(0)}</span>
                    </div>
                    <Badge className="bg-secondary text-muted-foreground border-border text-xs">Rank #{t.rank}</Badge>
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase text-foreground">{t.name}</h3>
                  <p className="text-muted-foreground text-xs font-body mt-0.5 mb-4">{t.league}</p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-display font-bold text-xl text-foreground">{t.wins}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-xl text-foreground">{t.losses}</div>
                      <div className="text-xs text-muted-foreground">Losses</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-xl text-foreground">{t.members}</div>
                      <div className="text-xs text-muted-foreground">Players</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Win rate</span>
                      <span>{Math.round((t.wins / (t.wins + t.losses)) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((t.wins / (t.wins + t.losses)) * 100)} className="h-1.5 bg-secondary" />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl uppercase mb-3">Brooklyn Ballers — Roster</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {players.map((p, i) => (
                  <div key={i} className="stat-card rounded-xl p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-2">
                      <span className="font-display font-bold text-sm text-primary">{p.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <p className="font-body font-semibold text-xs text-foreground leading-tight">{p.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{p.pos}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {active === "profile" && (
          <div className="animate-fade-in space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6">
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ background: "radial-gradient(circle at 80% 50%, hsl(28,95%,53%), transparent 60%)" }} />
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center orange-glow">
                    <span className="font-display font-black text-3xl text-primary">MJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display font-black text-3xl uppercase">Marcus Johnson</h1>
                  <p className="text-muted-foreground font-body text-sm">Point Guard · Brooklyn, NY</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-body text-muted-foreground">Member since 2023</span>
                    <span className="text-xs font-body text-primary">Pro League</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-display font-black text-5xl text-primary">92</div>
                  <div className="text-xs text-muted-foreground font-body">Overall Rating</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl uppercase mb-3">Career Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Games Played", value: "187", icon: "Calendar" },
                  { label: "Total Points", value: "4,648", icon: "Flame" },
                  { label: "Championships", value: "3", icon: "Trophy" },
                  { label: "MVP Awards", value: "2", icon: "Award" },
                ].map((s, i) => (
                  <div key={i} className="stat-card rounded-xl p-4">
                    <Icon name={s.icon} size={16} className="text-primary mb-2" />
                    <div className="font-display font-black text-2xl text-foreground">{s.value}</div>
                    <div className="text-muted-foreground text-xs font-body mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl uppercase mb-3">Skill Ratings</h2>
              <div className="stat-card rounded-xl p-5 space-y-4">
                {[
                  { skill: "Ball Handling", score: 94 },
                  { skill: "Shooting", score: 89 },
                  { skill: "Playmaking", score: 91 },
                  { skill: "Defense", score: 85 },
                  { skill: "Athleticism", score: 88 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-body text-foreground">{s.skill}</span>
                      <span className="font-display font-bold text-primary">{s.score}</span>
                    </div>
                    <Progress value={s.score} className="h-2 bg-secondary" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl uppercase mb-3">Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {achievements.map((a, i) => (
                  <div key={i} className={`stat-card rounded-xl p-4 flex items-center gap-3 ${!a.unlocked ? "opacity-40" : ""}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${a.unlocked ? "bg-primary/20 border border-primary/30" : "bg-secondary border border-border"}`}>
                      <Icon name={a.icon} size={18} className={a.unlocked ? "text-primary" : "text-muted-foreground"} />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm text-foreground">{a.title}</p>
                      <p className="text-muted-foreground text-xs">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHAT */}
        {active === "chat" && (
          <div className="animate-fade-in">
            <div className="flex flex-col" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <Icon name="Users" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl uppercase">Brooklyn Ballers</h2>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <p className="text-muted-foreground text-xs font-body">5 members online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Icon name="Phone" size={16} />
                  </button>
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Icon name="Info" size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((m) => (
                  <div key={m.id} className={`flex gap-2.5 ${m.own ? "flex-row-reverse" : ""}`}>
                    {!m.own && (
                      <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="font-display text-xs font-bold text-muted-foreground">{m.avatar}</span>
                      </div>
                    )}
                    <div className={`max-w-xs md:max-w-md ${m.own ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      {!m.own && <span className="text-xs text-muted-foreground font-body px-1">{m.author}</span>}
                      <div className={`rounded-2xl px-4 py-2.5 text-sm font-body ${m.own ? "chat-bubble-own text-white rounded-tr-sm" : "chat-bubble-other text-foreground rounded-tl-sm"}`}>
                        {m.text}
                      </div>
                      <span className="text-xs text-muted-foreground px-1">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 bg-secondary rounded-xl p-1 pl-4">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="Paperclip" size={16} />
                    </button>
                    <button
                      onClick={sendMessage}
                      className="p-2.5 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Icon name="Send" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}