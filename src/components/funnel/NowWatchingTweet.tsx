import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (element?: HTMLElement | null) => void } };
  }
}

interface NowWatchingTweetProps {
  /** Full tweet URL, e.g. https://x.com/pabloprompt/status/2055726656287871478 */
  tweetUrl: string;
  /** Heading text above the card */
  heading?: string;
  /** Optional link wrapping the heading */
  headingHref?: string;
  framed?: boolean;
}

export const NowWatchingTweet = ({
  tweetUrl,
  heading = "STORAGE LOCKER STUDIOS... NOW SHOWING!!!",
  headingHref,
  framed = true,
}: NowWatchingTweetProps) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = "https://platform.twitter.com/widgets.js";
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      window.twttr?.widgets?.load(embedRef.current);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => window.twttr?.widgets?.load(embedRef.current);
    document.body.appendChild(script);
  }, [tweetUrl]);

  const tweetFrame = (
    <div ref={embedRef} className="mx-auto min-h-[260px] w-full max-w-[430px] overflow-hidden rounded-md border border-border bg-background p-3">
      <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true">
        <a href={tweetUrl}>View tweet</a>
      </blockquote>
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-normal text-primary hover:underline">
        Open tweet on X
      </a>
    </div>
  );

  return (
    <section aria-labelledby="now-watching-tweet-heading" className="space-y-4">
      <h2
        id="now-watching-tweet-heading"
        className="font-mono uppercase tracking-normal text-primary whitespace-nowrap text-center text-[clamp(0.52rem,2vw,0.95rem)] leading-none"
      >
        {headingHref ? (
          <a href={headingHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {heading}
          </a>
        ) : (
          heading
        )}
      </h2>

      {framed ? <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">{tweetFrame}</Card> : tweetFrame}
    </section>
  );
};
