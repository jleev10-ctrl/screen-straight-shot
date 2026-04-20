import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tv, Trash2, ExternalLink, Plus } from "lucide-react";

type NowWatchingEntry = {
  id: string;
  post_url: string;
  title: string | null;
  note: string | null;
  created_at: string;
};

// Accept any X / Twitter post URL
const xUrlPattern = /^https?:\/\/(www\.)?(x|twitter)\.com\/[^/]+\/status\/\d+/i;

const schema = z.object({
  post_url: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500)
    .regex(xUrlPattern, "Must be an X/Twitter post URL (e.g. https://x.com/user/status/123...)"),
  title: z.string().trim().max(120).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

export const NowWatchingPanel = ({ userId }: { userId: string }) => {
  const [entries, setEntries] = useState<NowWatchingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ post_url: "", title: "", note: "" });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("now_watching")
      .select("id, post_url, title, note, created_at")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Couldn't load Now Watching entries");
      return;
    }
    setEntries(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("now_watching").insert({
      post_url: parsed.data.post_url,
      title: parsed.data.title || null,
      note: parsed.data.note || null,
      added_by: userId,
    });
    setSaving(false);
    if (error) {
      toast.error("Couldn't save. Try again?");
      return;
    }
    toast.success("Now Watching updated");
    setForm({ post_url: "", title: "", note: "" });
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("now_watching").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.success("Removed");
  };

  return (
    <Card className="p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Tv className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-lg font-bold">Now Watching (Bucket 11)</h2>
          <p className="text-xs text-muted-foreground">
            Paste an X post URL — newest entry shows live on the homepage.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="nw-url">X post URL *</Label>
          <Input
            id="nw-url"
            type="url"
            required
            placeholder="https://x.com/yourhandle/status/1234567890"
            maxLength={500}
            value={form.post_url}
            onChange={(e) => setForm({ ...form, post_url: e.target.value })}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="nw-title">Title (optional)</Label>
            <Input
              id="nw-title"
              maxLength={120}
              placeholder="e.g. Neon Drift teaser"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nw-note">Note (optional)</Label>
            <Input
              id="nw-note"
              maxLength={500}
              placeholder="Short caption"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={saving}
          className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold"
        >
          <Plus className="w-4 h-4" />
          {saving ? "Saving..." : "Set as Now Watching"}
        </Button>
      </form>

      <div className="space-y-2 pt-2 border-t border-border">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          History
        </p>
        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {!loading && entries.length === 0 && (
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        )}
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            className="flex items-start justify-between gap-3 p-3 rounded-md bg-secondary/40"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {idx === 0 && (
                  <Badge className="bg-primary text-primary-foreground">Live</Badge>
                )}
                {entry.title && (
                  <span className="text-sm font-semibold truncate">{entry.title}</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>
              <a
                href={entry.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1 break-all"
              >
                {entry.post_url} <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              {entry.note && (
                <p className="text-xs text-foreground/70">{entry.note}</p>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => remove(entry.id)}
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
