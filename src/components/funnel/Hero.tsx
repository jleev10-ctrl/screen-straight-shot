import { Button } from "@/components/ui/button";
import { Play, ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("submit")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Building in public
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Make <span className="text-gradient">Magic</span> Making Movies
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The AI revolution has arrived... Everyone wants to make a movie.
            We have the tools you need!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow font-semibold"
            >
              <Play className="w-4 h-4" />
              Submit your AI video
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Read the manifesto
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
