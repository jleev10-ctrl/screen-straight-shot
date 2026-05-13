import { Card } from "@/components/ui/card";
import curtainsBg from "@/assets/now-watching-curtains.jpg";

interface ComingSoonProps {
  /** Headline shown above the frame */
  heading?: string;
  /** Big label centered in the frame */
  label?: string;
  /** Smaller subtitle under the label */
  subtitle?: string;
  /** Show red curtains as the placeholder backdrop */
  showCurtains?: boolean;
}

export const ComingSoon = ({
  heading = "STORAGE LOCKER STUDIOS... COMING SOON",
  label = "Coming Soon",
  subtitle = "Prepare for next drop",
  showCurtains = true,
}: ComingSoonProps) => {
  return (
    <section aria-labelledby="coming-soon-heading" className="space-y-4">
      <h2
        id="coming-soon-heading"
        className="font-mono uppercase tracking-normal text-primary whitespace-nowrap text-center text-[clamp(0.52rem,2vw,0.95rem)] leading-none"
      >
        {heading}
      </h2>

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-md bg-background md:max-w-[430px]">
          {showCurtains && (
            <img
              src={curtainsBg}
              alt="Red stage curtains closed before a film begins"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <span className="font-mono uppercase tracking-widest text-primary text-lg md:text-2xl drop-shadow">
              {label}
            </span>
            <span className="font-mono uppercase tracking-wider text-foreground/80 text-[10px] md:text-xs drop-shadow">
              {subtitle}
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
};
