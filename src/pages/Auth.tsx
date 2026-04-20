import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. You can sign in now.");
      setMode("signin");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate("/admin");
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Sign In — Tap Movie Engine</title>
        <meta name="description" content="Admin access for Tap Movie Engine." />
      </Helmet>
      <main className="min-h-screen bg-hero flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-bold">{mode === "signin" ? "Admin sign in" : "Create admin account"}</h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Restricted to project admin."
                : "First time? Create your account, then ask the project owner to grant admin role."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
              {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 text-sm text-muted-foreground hover:text-primary w-full text-center"
          >
            {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
          </button>
        </Card>
      </main>
    </>
  );
};

export default Auth;
