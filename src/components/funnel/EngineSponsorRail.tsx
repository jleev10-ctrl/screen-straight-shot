import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

export type Engine = {
  name: string;
  tagline: string;
  url: string;
};

// Placeholder URLs — swap for real affiliate links later.
export const engines: Engine[] = [
  { name: "Runway", tagline: "Gen-3 video", url: "https://runwayml.com" },
  { name: "Luma", tagline: "Dream Machine", url: "https://lumalabs.ai" },
  { name: "Kling", tagline: "Cinematic AI", url: "https://klingai.com" },
  { name: "Higgsfield", tagline: "Motion control", url: "https://higgsfield.ai" },
  { name: "Seedance", tagline: "ByteDance video", url: "https://seedance.com" },
  { name: "Sora", tagline: "OpenAI video", url: "https://sora.com" },
];

export const EngineSponsorRail = () => {
  return (
    <aside
      aria-label="Engine partners"
      className="space-y-3"
    >
      <div className="space-y-1 mb-4">
        <p className="text-[10px] font-mono text-primary uppercase tracking-widest">
          Paddock
        </p>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Engines in play
        </h3>
      </div>

      {engines.map((engine) => (
        <a
          key={engine.name}
          href={engine.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block group"
        >
          <Card className="p-3 transition-all border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card hover:shadow-glow">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">
                  {engine.name}
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {engine.tagline}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[8px] px-1 py-0.5 rounded bg-muted/60 text-muted-foreground font-mono uppercase tracking-wider">
                  Partner
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>
        </a>
      ))}
    </aside>
  );
};
