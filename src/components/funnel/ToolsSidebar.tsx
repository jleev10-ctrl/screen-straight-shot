import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const tools = [
  { name: "Grok", desc: "X-native AI. Where it all starts.", url: "https://grok.com", primary: true },
  { name: "Sora", desc: "OpenAI's video model.", url: "https://sora.com" },
  { name: "Runway", desc: "Gen-3 video + editing suite.", url: "https://runwayml.com" },
  { name: "Pika", desc: "Fast, expressive video gen.", url: "https://pika.art" },
  { name: "Kling", desc: "Long-form, cinematic AI clips.", url: "https://klingai.com" },
  { name: "Luma", desc: "Dream Machine — motion + 3D.", url: "https://lumalabs.ai" },
];

export const ToolsSidebar = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-1 mb-4">
        <p className="text-sm font-mono text-primary uppercase tracking-widest">The Stack</p>
        <h3 className="text-lg font-semibold">Tools I'm using</h3>
      </div>

      {tools.map((tool) => (
        <a
          key={tool.name}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card
            className={`p-4 transition-all hover:border-primary/50 hover:shadow-glow ${
              tool.primary ? "border-primary/40 bg-card/80" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{tool.name}</span>
                  {tool.primary && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono uppercase">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
            </div>
          </Card>
        </a>
      ))}

      <p className="text-xs text-muted-foreground pt-2 px-1">
        Not sponsored — just what's working.
      </p>
    </div>
  );
};
