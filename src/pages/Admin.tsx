import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Shield, RefreshCw } from "lucide-react";

type EventRow = {
  id: string;
  event_type: string;
  label: string | null;
  path: string | null;
  referrer: string | null;
  created_at: string;
};

type Counts = {
  visits: number;
  clicks: number;
  visitsToday: number;
  visits7d: number;
  byLabel: { label: string; count: number }[];
  byPath: { path: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  recent: EventRow[];
};

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      checkAdmin(session.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (data) {
      setIsAdmin(true);
      loadStats();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const loadStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_events")
      .select("id,event_type,label,path,referrer,created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    setLoading(false);
    if (error) {
      toast.error("Couldn't load stats");
      return;
    }
    const rows = (data ?? []) as EventRow[];
    const now = Date.now();
    const dayMs = 86400000;
    const visits = rows.filter((r) => r.event_type === "visit");
    const clicks = rows.filter((r) => r.event_type === "click");

    const tally = (items: string[]) => {
      const m = new Map<string, number>();
      items.forEach((k) => m.set(k, (m.get(k) ?? 0) + 1));
      return [...m.entries()]
        .map(([k, count]) => ({ key: k, count }))
        .sort((a, b) => b.count - a.count);
    };

    setCounts({
      visits: visits.length,
      clicks: clicks.length,
      visitsToday: visits.filter((v) => now - new Date(v.created_at).getTime() < dayMs).length,
      visits7d: visits.filter((v) => now - new Date(v.created_at).getTime() < 7 * dayMs).length,
      byLabel: tally(clicks.map((c) => c.label || "(unlabeled)")).map((r) => ({ label: r.key, count: r.count })),
      byPath: tally(visits.map((v) => v.path || "/")).map((r) => ({ path: r.key, count: r.count })),
      byReferrer: tally(visits.map((v) => v.referrer || "(direct)")).map((r) => ({ referrer: r.key, count: r.count })),
      recent: rows.slice(0, 30),
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (isAdmin === false) {
    return (
      <main className="min-h-screen bg-hero flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Not authorized</h1>
          <p className="text-xs text-muted-foreground break-all">
            Your user ID: <code className="text-primary">{user?.id}</code>
          </p>
          <Button variant="outline" onClick={signOut} className="w-full">
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin — Storage Locker</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-hero">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Traffic</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadStats} disabled={loading}>
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 space-y-6">
          {loading && <p className="text-muted-foreground">Loading…</p>}
          {!loading && counts && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4">
                  <div className="text-xs text-muted-foreground">Total visits</div>
                  <div className="text-3xl font-bold">{counts.visits}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-muted-foreground">Today</div>
                  <div className="text-3xl font-bold">{counts.visitsToday}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-muted-foreground">Last 7 days</div>
                  <div className="text-3xl font-bold">{counts.visits7d}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-muted-foreground">Clicks</div>
                  <div className="text-3xl font-bold">{counts.clicks}</div>
                </Card>
              </div>

              <Card className="p-5">
                <h2 className="text-sm font-semibold mb-3">Clicks by element</h2>
                {counts.byLabel.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No clicks tracked yet.</p>
                ) : (
                  <div className="space-y-1">
                    {counts.byLabel.map((row) => (
                      <div key={row.label} className="flex justify-between text-sm border-b border-border py-1">
                        <span className="truncate pr-3">{row.label}</span>
                        <span className="font-mono text-muted-foreground">{row.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-5">
                <h2 className="text-sm font-semibold mb-3">Visits by page</h2>
                <div className="space-y-1">
                  {counts.byPath.map((row) => (
                    <div key={row.path} className="flex justify-between text-sm border-b border-border py-1">
                      <span className="truncate pr-3">{row.path}</span>
                      <span className="font-mono text-muted-foreground">{row.count}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h2 className="text-sm font-semibold mb-3">Top referrers</h2>
                <div className="space-y-1">
                  {counts.byReferrer.slice(0, 15).map((row) => (
                    <div key={row.referrer} className="flex justify-between text-sm border-b border-border py-1">
                      <span className="truncate pr-3">{row.referrer}</span>
                      <span className="font-mono text-muted-foreground">{row.count}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h2 className="text-sm font-semibold mb-3">Recent events</h2>
                <div className="space-y-1 text-xs font-mono">
                  {counts.recent.map((r) => (
                    <div key={r.id} className="flex gap-2 text-muted-foreground">
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                      <span className="text-foreground">{r.event_type}</span>
                      <span className="truncate">{r.label || r.path || ""}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
