import { Card } from "@/components/ui/card";

export const NowWatching = () => {
  return (
    <section aria-labelledby="now-watching-heading" className="space-y-4">
      <h2
        id="now-watching-heading"
        className="text-xs md:text-sm font-mono tracking-normal text-muted-foreground"
      >
        <a href="https://higgsfield.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">storage locker studios &gt; now showing ...get it at higgsfield !!</a>
      </h2>

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">
        <div className="relative w-full mx-auto max-w-[400px] md:max-w-none md:h-[100vh] md:aspect-auto" style={{ aspectRatio: "9 / 16" }}>
          <iframe
            src="https://www.youtube.com/embed/zFGXNoDWXCY"
            title="Now Watching"
            className="absolute inset-0 w-full h-full rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Card>
    </section>
  );
};
