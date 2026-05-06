import { ExternalLink } from "lucide-react";

export type Sponsor = {
  name: string;
  tagline?: string;
  url: string;
  titleSponsor?: boolean;
  clip?: string; // optional looping mp4 thumbnail
};

// Left rail — the "Engines" (video / image generation models)
export const engines: Sponsor[] = [
  { name: "Higgsfield", tagline: "Motion control", url: "https://higgsfield.ai", titleSponsor: true },
  { name: "Kling 3.0", tagline: "Cinematic AI", url: "https://klingai.com" },
  { name: "Veo 3", tagline: "Google DeepMind", url: "https://deepmind.google/technologies/veo/" },
  { name: "Runway", tagline: "Gen-3 video", url: "https://runwayml.com" },
  { name: "Grok Imagine", tagline: "xAI", url: "https://grok.com/imagine" },
];

// Right rail — the "Tools" (post / audio / supporting craft)
export const tools: Sponsor[] = [
  { name: "DeeVid AI", tagline: "Video toolkit", url: "https://deevid.ai" },
  { name: "Pika", tagline: "Pika 2.0", url: "https://pika.art", clip: "/clips/seedance.mp4" },
  { name: "Luma", tagline: "Dream Machine", url: "https://lumalabs.ai" },
  { name: "Yapper", tagline: "AI dialogue", url: "https://yapper.so" },
  { name: "ElevenLabs", tagline: "Voice & audio", url: "https://elevenlabs.io" },
];

const Tile = ({ sponsor }: { sponsor: Sponsor }) => (
  <a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="group block rounded-md border border-primary/40 bg-black/60 backdrop-blur-sm px-3 py-2.5 transition-all hover:border-primary hover:bg-black/80 hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
  >
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="font-bold text-sm leading-tight tracking-wide text-foreground truncate">
          {sponsor.name}
        </div>
        {sponsor.tagline && (
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 font-mono uppercase tracking-wider truncate">
            {sponsor.tagline}
          </p>
        )}
      </div>
      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
    </div>
    {sponsor.titleSponsor && (
      <div className="mt-1.5 inline-block text-[8px] font-mono uppercase tracking-[0.15em] text-primary border border-primary/60 px-1.5 py-0.5 rounded-sm">
        Title Sponsor
      </div>
    )}
    <div className="mt-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70 group-hover:text-primary transition-colors">
      Get it →
    </div>
  </a>
);

const RailHeader = ({ label }: { label: string }) => (
  <div className="mb-3 pb-2 border-b border-primary/20">
    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary">
      // Paddock
    </p>
    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mt-0.5">
      {label}
    </h3>
  </div>
);

const RailFooter = () => (
  <p className="mt-3 pt-2 border-t border-primary/20 text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
    Affiliate · Season 01
  </p>
);

export const PaddockRailLeft = () => (
  <aside aria-label="Paddock — engines" className="w-full">
    <RailHeader label="Engines" />
    <div className="space-y-2">
      {engines.map((s) => <Tile key={s.name} sponsor={s} />)}
    </div>
    <RailFooter />
  </aside>
);

export const PaddockRailRight = () => (
  <aside aria-label="Paddock — tools" className="w-full">
    <RailHeader label="Tools" />
    <div className="space-y-2">
      {tools.map((s) => <Tile key={s.name} sponsor={s} />)}
    </div>
    <RailFooter />
  </aside>
);
