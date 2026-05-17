import { Card } from "@/components/ui/card";

interface NowWatchingTweetProps {
  /** Full tweet URL, e.g. https://x.com/pabloprompt/status/2055726656287871478 */
  tweetUrl: string;
  /** Heading text above the card */
  heading?: string;
  /** Optional link wrapping the heading */
  headingHref?: string;
}

export const NowWatchingTweet = ({
  tweetUrl,
  heading = "STORAGE LOCKER STUDIOS... NOW SHOWING!!!",
  headingHref,
}: NowWatchingTweetProps) => {
  const src = `https://twitframe.com/show?url=${encodeURIComponent(tweetUrl)}`;

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

      <Card className="p-3 md:p-4 bg-card/60 backdrop-blur border-border">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-md bg-background md:max-w-[430px]">
          <iframe
            src={src}
            title="Now Watching — Tweet"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Card>
    </section>
  );
};
