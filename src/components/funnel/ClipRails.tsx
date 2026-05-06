import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type Clip = {
  id: string;
  title: string;
  poster: string; // image URL (local or remote)
  src?: string;   // mp4 URL — optional for mock
};

// MOCK clips — swap poster/src with your real assets later.
// Using picsum placeholders so layout is visible immediately.
const mock = (i: number, title: string): Clip => ({
  id: `clip-${i}`,
  title,
  poster: `https://picsum.photos/seed/slk${i}/400/225`,
});

export const leftClips: Clip[] = [
  mock(1, "Neon Drift — teaser"),
  mock(2, "Shadow Protocol — cold open"),
  mock(3, "Murmur — chase"),
  mock(4, "Round 03 winner"),
  mock(5, "BTS — engine room"),
];

export const rightClips: Clip[] = [
  mock(6, "Audition reel"),
  mock(7, "Storyboard test"),
  mock(8, "Lighting study"),
  mock(9, "Sound design pass"),
  mock(10, "Final color"),
];

const Tile = ({ clip, onPlay }: { clip: Clip; onPlay: (c: Clip) => void }) => (
  <button
    type="button"
    onClick={() => onPlay(clip)}
    className="group relative block w-full overflow-hidden rounded-md border border-primary/30 bg-black/60 aspect-video transition-all hover:border-primary hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
  >
    <img
      src={clip.poster}
      alt={clip.title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full bg-primary/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Play className="w-3 h-3 text-primary-foreground fill-current" />
      </div>
    </div>
    <div className="absolute bottom-1 left-1.5 right-1.5">
      <p className="text-[9px] font-mono uppercase tracking-wider text-foreground/90 truncate">
        {clip.title}
      </p>
    </div>
  </button>
);

const RailHeader = ({ label }: { label: string }) => (
  <div className="mb-3 pb-2 border-b border-primary/20">
    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary">// Reel</p>
    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mt-0.5">{label}</h3>
  </div>
);

const useLightbox = () => {
  const [active, setActive] = useState<Clip | null>(null);
  const node = (
    <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-primary/40">
        {active && (
          <div className="aspect-video bg-black">
            {active.src ? (
              <video src={active.src} controls autoPlay className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img src={active.poster} alt={active.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <p className="text-foreground/80 text-sm font-mono uppercase tracking-wider">
                    Mock — drop mp4 src to enable
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
  return { open: setActive, node };
};

export const ClipRailLeft = () => {
  const { open, node } = useLightbox();
  return (
    <aside aria-label="Reel — left" className="w-full">
      <RailHeader label="Reel A" />
      <div className="space-y-2">
        {leftClips.map((c) => <Tile key={c.id} clip={c} onPlay={open} />)}
      </div>
      {node}
    </aside>
  );
};

export const ClipRailRight = () => {
  const { open, node } = useLightbox();
  return (
    <aside aria-label="Reel — right" className="w-full">
      <RailHeader label="Reel B" />
      <div className="space-y-2">
        {rightClips.map((c) => <Tile key={c.id} clip={c} onPlay={open} />)}
      </div>
      {node}
    </aside>
  );
};
