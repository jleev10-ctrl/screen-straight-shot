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
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-md bg-background md:max-w-[430px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono uppercase tracking-widest text-muted-foreground text-xs md:text-sm">
              Coming Soon
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
};
