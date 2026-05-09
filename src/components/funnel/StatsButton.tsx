import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const PASSWORD = "OLDMAN2026";
const STORAGE_KEY = "sl-stats-unlocked";

type EventRow = {
  id: string;
  event_type: string;
  label: string | null;
  path: string | null;
  created_at: string;
};

type Counts = {
  visits: number;
  clicks: number;
  visitsToday: number;
  visits7d: number;
  byLabel: { label: string; count: number }[];
  recent: EventRow[];
};

export const StatsButton = () => {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_events")
      .select("id,event_type,label,path,created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    const rows = (data ?? []) as EventRow[];
    const now = Date.now();
    const dayMs = 86400000;
    const visits = rows.filter((r) => r.event_type === "visit");
    const clicks = rows.filter((r) => r.event_type === "click");
    const labelMap = new Map<string, number>();
    clicks.forEach((c) => {
      const k = c.label || "(unlabeled)";
      labelMap.set(k, (labelMap.get(k) ?? 0) + 1);
    });
    setCounts({
      visits: visits.length,
      clicks: clicks.length,
      visitsToday: visits.filter((v) => now - new Date(v.created_at).getTime() < dayMs).length,
      visits7d: visits.filter((v) => now - new Date(v.created_at).getTime() < 7 * dayMs).length,
      byLabel: [...labelMap.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count),
      recent: rows.slice(0, 25),
    });
  };

  useEffect(() => {
    if (open && unlocked) loadStats();
  }, [open, unlocked]);

  const submitPwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Storage Locker stats"
        className="fixed top-3 left-3 z-50 h-10 w-10 rounded-md bg-gradient-primary text-primary-foreground font-bold text-sm shadow-glow hover:opacity-90 transition-opacity"
      >
        SL
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Storage Locker — Traffic</DialogTitle>
          </DialogHeader>

          {!unlocked ? (
            <form onSubmit={submitPwd} className="space-y-3 pt-2">
              <Input
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Unlock</Button>
            </form>
          ) : loading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : counts ? (
            <div className="space-y-5 pt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground">Total visits</div>
                  <div className="text-2xl font-bold">{counts.visits}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground">Today</div>
                  <div className="text-2xl font-bold">{counts.visitsToday}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground">Last 7d</div>
                  <div className="text-2xl font-bold">{counts.visits7d}</div>
                </Card>
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground">Click-throughs</div>
                  <div className="text-2xl font-bold">{counts.clicks}</div>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Clicks by element</h3>
                {counts.byLabel.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No clicks tracked yet.</p>
                ) : (
                  <div className="space-y-1">
                    {counts.byLabel.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between text-sm border-b border-border py-1"
                      >
                        <span className="truncate pr-3">{row.label}</span>
                        <span className="font-mono text-muted-foreground">{row.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Recent events</h3>
                <div className="space-y-1 text-xs font-mono">
                  {counts.recent.map((r) => (
                    <div key={r.id} className="flex gap-2 text-muted-foreground">
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                      <span className="text-foreground">{r.event_type}</span>
                      <span className="truncate">{r.label || r.path || ""}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={loadStats}>
                Refresh
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
