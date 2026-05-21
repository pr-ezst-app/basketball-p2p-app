import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AppShell from "@/components/AppShell";
import type { Section } from "@/components/AppShell";
import HubSection from "@/components/HubSection";
import type { LobbyState } from "@/components/HubSection";
import GamesSection from "@/components/GamesSection";
import ChatSection from "@/components/ChatSection";
import { initialMessages } from "@/components/ChatSection";
import type { ChatMessage } from "@/components/ChatSection";

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

export default function Index() {
  const [active, setActive] = useState<Section>("hub");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  const [lobbyState, setLobbyState] = useState<LobbyState>("idle");
  const [playersReady, setPlayersReady] = useState(0);
  const [gameScore, setGameScore] = useState({ home: 0, away: 0 });
  const [gameClock, setGameClock] = useState("12:00");
  const [gameQuarter, setGameQuarter] = useState(1);
  const [gameSeconds, setGameSeconds] = useState(720);

  const handleStartGame = () => {
    setLobbyState("waiting");
    setPlayersReady(0);
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setPlayersReady(count);
      if (count >= 10) {
        clearInterval(interval);
        setTimeout(() => setLobbyState("ready"), 600);
      }
    }, 1800);
  };

  const handleEnterMatchup = () => {
    setLobbyState("live");
    setGameScore({ home: 0, away: 0 });
    setGameSeconds(720);
    setGameQuarter(1);
    setGameClock("12:00");
    const tick = setInterval(() => {
      setGameSeconds(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(tick);
          return 0;
        }
        const m = Math.floor(next / 60);
        const s = next % 60;
        setGameClock(`${m}:${s.toString().padStart(2, "0")}`);
        return next;
      });
      if (Math.random() < 0.25) {
        setGameScore(prev => ({ ...prev, home: prev.home + (Math.random() < 0.5 ? 2 : 3) }));
      }
      if (Math.random() < 0.22) {
        setGameScore(prev => ({ ...prev, away: prev.away + (Math.random() < 0.5 ? 2 : 3) }));
      }
    }, 1000);
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
    <AppShell active={active} setActive={setActive}>

      {/* HUB */}
      {active === "hub" && (
        <HubSection
          setActive={setActive}
          lobbyState={lobbyState}
          setLobbyState={setLobbyState}
          playersReady={playersReady}
          gameScore={gameScore}
          gameClock={gameClock}
          gameQuarter={gameQuarter}
          onStartGame={handleStartGame}
          onEnterMatchup={handleEnterMatchup}
        />
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
      {active === "games" && <GamesSection />}

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
        <ChatSection
          chatInput={chatInput}
          setChatInput={setChatInput}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
      )}

    </AppShell>
  );
}
