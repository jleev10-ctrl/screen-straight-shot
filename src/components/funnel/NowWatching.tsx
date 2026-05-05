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
  const [, setLoading] = useState(true);

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

  return (
    <section aria-labelledby="now-watching-heading" className="space-y-4 !block" style={{ display: 'block' }}>
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

      {false ? (
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
      )}
    </section>
  );
};
