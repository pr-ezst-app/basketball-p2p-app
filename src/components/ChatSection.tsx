import Icon from "@/components/ui/icon";

export const initialMessages = [
  { id: 1, author: "Marcus J.", text: "Practice moved to 6pm tomorrow, confirm attendance 🏀", time: "10:24", own: false, avatar: "MJ" },
  { id: 2, author: "Me", text: "Confirmed, I'll be there", time: "10:31", own: true, avatar: "ME" },
  { id: 3, author: "Darius C.", text: "Same, bringing the new shoes 😤", time: "10:33", own: false, avatar: "DC" },
  { id: 4, author: "Coach Williams", text: "Great. Focus on pick-and-roll defense today. Watch the film I sent.", time: "10:45", own: false, avatar: "CW" },
  { id: 5, author: "Me", text: "Already watched it twice. That lane coverage was weak on our end.", time: "10:48", own: true, avatar: "ME" },
  { id: 6, author: "Tyrone W.", text: "Agreed. I got the gap assignment drills ready for warmup", time: "10:52", own: false, avatar: "TW" },
];

export type ChatMessage = typeof initialMessages[number];

interface ChatSectionProps {
  chatInput: string;
  setChatInput: (v: string) => void;
  chatMessages: ChatMessage[];
  sendMessage: () => void;
}

export default function ChatSection({ chatInput, setChatInput, chatMessages, sendMessage }: ChatSectionProps) {
  return (
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
  );
}
