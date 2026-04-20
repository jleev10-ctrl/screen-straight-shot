import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send } from "lucide-react";

const schema = z.object({
  submitter_name: z.string().trim().min(1, "Name required").max(100),
  x_handle: z.string().trim().max(50).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255).optional().or(z.literal("")),
  video_url: z.string().trim().url("Must be a valid URL").max(500),
  note: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const SubmissionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    submitter_name: "",
    x_handle: "",
    email: "",
    video_url: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("submissions").insert({
      submitter_name: parsed.data.submitter_name,
      x_handle: parsed.data.x_handle || null,
      email: parsed.data.email || null,
      video_url: parsed.data.video_url,
      note: parsed.data.note || null,
    });

    setLoading(false);

    if (error) {
      toast.error("Submission failed. Try again?");
      return;
    }

    navigate("/thank-you");
  };

  return (
    <section id="submit" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-mono text-primary uppercase tracking-widest">02 — Submit</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Send me your AI clip
        </h2>
        <p className="text-muted-foreground">
          The best ones get featured on X (with credit). Drop a link to your video — YouTube, X, Vimeo, anything public.
        </p>
      </div>

      <Card className="p-6 md:p-8 shadow-elegant">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name *</Label>
              <Input
                id="name"
                required
                maxLength={100}
                value={form.submitter_name}
                onChange={(e) => setForm({ ...form, submitter_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x">X handle</Label>
              <Input
                id="x"
                placeholder="@yourhandle"
                maxLength={50}
                value={form.x_handle}
                onChange={(e) => setForm({ ...form, x_handle: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional, so I can reach you)</Label>
            <Input
              id="email"
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Video URL *</Label>
            <Input
              id="url"
              type="url"
              required
              placeholder="https://..."
              maxLength={500}
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (what tools, what's the story?)</Label>
            <Textarea
              id="note"
              rows={4}
              maxLength={1000}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow font-semibold"
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Submit clip"}
          </Button>
        </form>
      </Card>
    </section>
  );
};
