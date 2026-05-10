import { Card } from "@/components/ui/card";

export const NowWatching = () => {
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
          <iframe
            src="https://www.youtube-nocookie.com/embed/zFGXNoDWXCY?vq=hd1080&hd=1&rel=0&modestbranding=1"
            title="Now Watching"
            className="absolute inset-0 w-full h-full rounded-md"
            loading="eager"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Card>
    </section>
  );
};
