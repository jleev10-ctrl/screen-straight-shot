import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const CTAButtons = () => {
  const scrollToForm = () => {
    document.getElementById("submit")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      <Button
        asChild
        size="lg"
        variant="outline"
        className="border-primary/40 hover:border-primary hover:bg-primary/10"
      >
        <a
          href="https://x.com/CuratorSLS"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow @CuratorSLS on X"
        >
          {/* X logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Follow @CuratorSLS
        </a>
      </Button>

      <Button
        size="lg"
        onClick={scrollToForm}
        className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow font-semibold"
      >
        <Send className="w-4 h-4" />
        Submit a clip
      </Button>
    </div>
  );
};
