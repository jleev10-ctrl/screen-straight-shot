import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tv, ExternalLink } from "lucide-react";
import curtainsBg from "@/assets/now-watching-curtains.jpg";

type Entry = {
  id: string;
  post_url: string;
  title: string | null;
  note: string | null;
  created_at: string;
};

export const NowWatching = () => {
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data } = await supabase
        .from("now_watching")
        .select("id, post_url, title, note, created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!mounted) return;
      setEntry(data);
      setLoading(false);
    };

    load();

    // Live updates: refresh when admin adds/removes
    const channel = supabase
      .channel("now_watching_public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "now_watching" },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return null;

  return (
    <section aria-labelledby="now-watching-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <Tv className="w-4 h-4 text-primary" />
        <h2
          id="now-watching-heading"
          className="text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground"
        >
          Storage Locker Studios — Now Watching
        </h2>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>

      {entry ? (
        <Card className="p-5 md:p-6 bg-card/60 backdrop-blur border-border space-y-3">
          {entry.title && (
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              {entry.title}
            </h3>
          )}
          {entry.note && (
            <p className="text-sm text-foreground/80 whitespace-pre-wrap">
              {entry.note}
            </p>
          )}
          <a
            href={entry.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold break-all"
          >
            Watch on X <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </Card>
      ) : (
        <Card
          className="relative overflow-hidden p-8 md:p-12 border-border text-center min-h-[240px] md:min-h-[300px] flex flex-col items-center justify-center gap-3"
          style={{
            backgroundImage: `linear-gradient(to bottom, hsl(var(--background) / 0.55), hsl(var(--background) / 0.75)), url(${curtainsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-xl md:text-2xl font-bold text-foreground drop-shadow-lg">
            Now Watching… it could be you.
          </p>
          <a
            href="https://x.com/CuratorSLS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm md:text-base text-primary hover:underline font-semibold drop-shadow"
          >
            Follow Storage Locker Studios @CuratorSLS on X
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </Card>
      )}
    </section>
  );
};
