import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
});

export const EngineUpdates = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("fans").insert({ email: parsed.data.email });
    setLoading(false);

    if (error) {
      // unique violation = already subscribed; treat as success silently
      if (error.code === "23505") {
        setDone(true);
        return;
      }
      toast.error("Couldn't sign you up. Try again?");
      return;
    }

    setDone(true);
    toast.success("You're in. Engine updates incoming.");
  };

  return (
    <Card className="p-5 md:p-6 bg-card/60 border-border/60">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-mono uppercase tracking-widest text-primary">
            Engine Updates
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Drop your email. Get pinged when new engines, films, or rounds drop. No spam.
        </p>

        {done ? (
          <p className="text-sm font-medium text-foreground">
            ✓ You're on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
              {loading ? "..." : "Notify me"}
            </Button>
          </form>
        )}
      </div>
    </Card>
  );
};
