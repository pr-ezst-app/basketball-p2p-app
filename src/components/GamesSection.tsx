import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const liveGames = [
  { team1: "Hawks", team2: "Nets", score1: 87, score2: 82, quarter: "Q4", time: "3:42" },
  { team1: "Celtics", team2: "Bucks", score1: 64, score2: 71, quarter: "Q3", time: "8:15" },
];

const scheduledGames = [
  { team1: "Thunder", team2: "Warriors", date: "Today", time: "20:00", league: "NBA" },
  { team1: "Knicks", team2: "76ers", date: "Tomorrow", time: "19:30", league: "NBA" },
  { team1: "Raptors", team2: "Cavaliers", date: "May 24", time: "21:00", league: "NBA" },
];

export default function GamesSection() {
  return (
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
  );
}
