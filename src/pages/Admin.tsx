import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, ExternalLink, Star, X as XIcon, RotateCcw, Shield } from "lucide-react";
import { NowWatchingPanel } from "@/components/admin/NowWatchingPanel";

type Submission = {
  id: string;
  submitter_name: string;
  x_handle: string | null;
  email: string | null;
  video_url: string;
  note: string | null;
  status: "new" | "featured" | "passed";
  created_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
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
      loadSubmissions();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const loadSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Couldn't load submissions");
      return;
    }
    setSubmissions(data as Submission[]);
  };

  const updateStatus = async (id: string, status: Submission["status"]) => {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast.success(`Marked as ${status}`);
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
          <p className="text-sm text-muted-foreground">
            Your account exists but doesn't have admin role. The project owner needs to grant it via the Cloud database
            (add a row in <code className="text-primary">user_roles</code> with your user_id and role <code className="text-primary">admin</code>).
          </p>
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
        <title>Admin — Tap Movie Engine</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-hero">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Submissions</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
              Sign out
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 space-y-6">
          {user && <NowWatchingPanel userId={user.id} />}

          <div className="space-y-2">
            <h2 className="text-lg font-bold">Submissions</h2>
          </div>

          {loading && <p className="text-muted-foreground">Loading...</p>}
          {!loading && submissions.length === 0 && (
            <Card className="p-12 text-center text-muted-foreground">No submissions yet.</Card>
          )}

          {submissions.map((s) => (
            <Card key={s.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{s.submitter_name}</h3>
                    {s.x_handle && (
                      <span className="text-xs text-muted-foreground">{s.x_handle}</span>
                    )}
                    <Badge
                      variant={s.status === "featured" ? "default" : s.status === "passed" ? "secondary" : "outline"}
                      className={s.status === "featured" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {s.status}
                    </Badge>
                  </div>
                  {s.email && <p className="text-xs text-muted-foreground">{s.email}</p>}
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString()}
                  </p>
                </div>
                <a
                  href={s.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1 break-all"
                >
                  Watch <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {s.note && (
                <p className="text-sm text-foreground/80 bg-secondary/50 rounded-md p-3 whitespace-pre-wrap">
                  {s.note}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant={s.status === "featured" ? "default" : "outline"}
                  onClick={() => updateStatus(s.id, "featured")}
                  className={s.status === "featured" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Star className="w-3.5 h-3.5" />
                  Feature
                </Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(s.id, "passed")}>
                  <XIcon className="w-3.5 h-3.5" />
                  Pass
                </Button>
                {s.status !== "new" && (
                  <Button size="sm" variant="ghost" onClick={() => updateStatus(s.id, "new")}>
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default Admin;
