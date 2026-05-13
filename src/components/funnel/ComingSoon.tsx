import { Card } from "@/components/ui/card";

export const ComingSoon = () => {
  return (
    <section aria-labelledby="coming-soon-heading" className="space-y-4">
      <h2
        id="coming-soon-heading"
        className="font-mono uppercase tracking-normal text-primary whitespace-nowrap text-center text-[clamp(0.52rem,2vw,0.95rem)] leading-none"
      >
        STORAGE LOCKER STUDIOS... COMING SOON
      </h2>

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-md bg-background md:max-w-[430px] border-2 border-dashed border-primary/40">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <span className="font-mono uppercase tracking-widest text-primary text-lg md:text-2xl">
              Coming Soon
            </span>
            <span className="font-mono uppercase tracking-wider text-muted-foreground text-[10px] md:text-xs">
              Prepare for next drop
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
};
