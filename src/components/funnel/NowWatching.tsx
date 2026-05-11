import { useState } from "react";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import nowWatchingPoster from "@/assets/now-watching-poster.jpg";

export const NowWatching = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section aria-labelledby="now-watching-heading" className="space-y-4">
      <h2
        id="now-watching-heading"
        className="font-mono uppercase tracking-normal text-primary whitespace-nowrap text-center text-[clamp(0.52rem,2vw,0.95rem)] leading-none"
      >
        <a href="https://higgsfield.ai" target="_blank" rel="noopener noreferrer" className="hover:underline">
          STORAGE LOCKER STUDIOS... NOW SHOWING!!! GET IT HIGGSFIELD
        </a>
      </h2>

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">
        <div className="relative w-full mx-auto max-w-[400px] md:max-w-none md:h-[100vh] md:aspect-auto" style={{ aspectRatio: "9 / 16" }}>
          {isPlaying ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/zFGXNoDWXCY?autoplay=1&mute=1&playsinline=1&vq=hd1080&hd=1&rel=0&modestbranding=1"
              title="Now Watching"
              className="absolute inset-0 h-full w-full rounded-md"
              loading="eager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              aria-label="Play Now Showing"
              onClick={() => setIsPlaying(true)}
              className="group absolute inset-0 z-10 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="absolute inset-0 bg-background/10 transition-colors group-hover:bg-background/20" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/70 bg-card/80 text-primary shadow-glow backdrop-blur-sm transition-transform group-hover:scale-105 md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 fill-current md:h-9 md:w-9" aria-hidden="true" />
              </span>
            </button>
          )}
          {!isPlaying && (
            <img
              src={nowWatchingPoster}
              alt="Now Showing preview"
              className="pointer-events-none absolute inset-0 h-full w-full rounded-md object-cover"
              loading="eager"
              fetchPriority="high"
            />
          )}
        </div>
      </Card>
    </section>
  );
};
