import { Play } from "lucide-react";
import { engines, tools, type Sponsor } from "./PaddockRails";

const Tile = ({ sponsor }: { sponsor: Sponsor }) => (
  <a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="group relative block w-full overflow-hidden rounded-md border border-primary/30 bg-black aspect-video transition-all hover:border-primary hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
  >
    {sponsor.clip ? (
      <video
        src={sponsor.clip}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-black">
        <span className="text-base lg:text-lg font-black uppercase tracking-tight text-foreground/90 px-2 text-center leading-none">
          {sponsor.name}
        </span>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />


    {sponsor.titleSponsor && (
      <div className="absolute top-1 left-1 text-[8px] font-mono uppercase tracking-[0.15em] text-primary border border-primary/60 px-1 py-0.5 rounded-sm bg-black/70">
        Title
      </div>
    )}

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full bg-primary/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Play className="w-3 h-3 text-primary-foreground fill-current" />
      </div>
    </div>

    <div className="absolute bottom-1 left-1.5 right-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wide text-foreground leading-tight truncate">
        {sponsor.name}
      </p>
      {sponsor.tagline && (
        <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground truncate">
          {sponsor.tagline}
        </p>
      )}
    </div>
  </a>
);

const RailHeader = ({ label }: { label: string }) => (
  <div className="mb-3 pb-2 border-b border-primary/20">
    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary">// Paddock Reels</p>
    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mt-0.5">{label}</h3>
  </div>
);

const RailFooter = () => (
  <p className="mt-3 pt-2 border-t border-primary/20 text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
    Affiliate · Season 01
  </p>
);

export const ClipRailLeft = () => (
  <aside aria-label="Paddock reels — engines" className="w-full">
    <RailHeader label="Engines" />
    <div className="space-y-2">
      {engines.map((s) => <Tile key={s.name} sponsor={s} />)}
    </div>
    <RailFooter />
  </aside>
);

export const ClipRailRight = () => (
  <aside aria-label="Paddock reels — tools" className="w-full">
    <RailHeader label="Tools" />
    <div className="space-y-2">
      {tools.map((s) => <Tile key={s.name} sponsor={s} />)}
    </div>
    <RailFooter />
  </aside>
);
