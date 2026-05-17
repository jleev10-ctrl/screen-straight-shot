import { Card } from "@/components/ui/card";

interface NowWatchingProps {
  children?: React.ReactNode;
}

export const NowWatching = ({ children }: NowWatchingProps) => {
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

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border space-y-4">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-md bg-background md:max-w-[430px]">
          <iframe
            src="https://www.youtube-nocookie.com/embed/zFGXNoDWXCY?playsinline=1&rel=0&modestbranding=1"
            title="Now Watching"
            className="absolute inset-0 h-full w-full"
            loading="eager"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        {children}
      </Card>
    </section>
  );
};
