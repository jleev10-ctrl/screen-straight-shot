import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/funnel/Hero";
import { Manifesto } from "@/components/funnel/Manifesto";
import { EmployeeIntro } from "@/components/funnel/EmployeeIntro";
import { CTAButtons } from "@/components/funnel/CTAButtons";
import { NowWatching } from "@/components/funnel/NowWatching";
import { SubmissionForm } from "@/components/funnel/SubmissionForm";
import { GoogleSearchPreview } from "@/components/funnel/GoogleSearchPreview";
import { Footer } from "@/components/funnel/Footer";
import { BucketPlaceholder } from "@/components/funnel/BucketPlaceholder";

const Index = () => {
  useEffect(() => {
    document.title = "Tap Movie Engine — Making Movies";
  }, []);

  return (
    <>
      <Helmet>
        <title>Tap Movie Engine — Making Movies</title>
        <meta
          name="description"
          content="Storage Locker Studios — 12-bucket homepage: hero, current round, films, the girl, vaults, stats, battle notes, now watching."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="min-h-screen bg-hero">
        {/* Bucket 1 — Sign-In (Storage Locker gatekeeper) */}
        <BucketPlaceholder
          number={1}
          title="Sign-In — Storage Locker Gatekeeper"
          description="Gatekeeper sign-in to enter the Storage Locker. Wire to /auth when ready."
          id="bucket-1-signin"
        />

        {/* Bucket 2 — Hero */}
        <section id="bucket-2-hero">
          <Hero />
        </section>

        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16">
          {/* Bucket 3 — Current Round (Live telemetry) */}
          <BucketPlaceholder
            number={3}
            title="Current Round — Live Telemetry"
            description="Live round telemetry: countdown, current entries, leaderboard pulse."
            id="bucket-3-current-round"
          />

          {/* Bucket 4 — Video: Neon Drift */}
          <BucketPlaceholder
            number={4}
            title="Film — Neon Drift"
            description="Featured film slot: Neon Drift. Add player + credits."
            id="bucket-4-neon-drift"
          />

          {/* Bucket 5 — Video: Shadow Protocol */}
          <BucketPlaceholder
            number={5}
            title="Film — Shadow Protocol"
            description="Featured film slot: Shadow Protocol. Add player + credits."
            id="bucket-5-shadow-protocol"
          />

          {/* Bucket 6 — Video: Murmur */}
          <BucketPlaceholder
            number={6}
            title="Film — Murmur"
            description="Featured film slot: Murmur. Add player + credits."
            id="bucket-6-murmur"
          />

          {/* Bucket 7 — The Girl (EmployeeIntro) */}
          <section id="bucket-7-the-girl" className="space-y-4 scroll-mt-8">
            <div className="space-y-2">
              <p className="text-sm font-mono text-primary uppercase tracking-widest">
                07 — The Girl
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Meet the operator
              </h2>
            </div>
            <EmployeeIntro />
            <CTAButtons />
          </section>

          {/* Manifesto (existing supporting copy) */}
          <Manifesto />

          {/* Submission form (existing) */}
          <SubmissionForm />

          {/* Bucket 8 — Active Vaults / Engine Rankings */}
          <BucketPlaceholder
            number={8}
            title="Active Vaults — Engine Rankings"
            description="Live rankings of active vaults / engines competing this round."
            id="bucket-8-vaults"
          />

          {/* Bucket 9 — Season Stats */}
          <BucketPlaceholder
            number={9}
            title="Season Stats"
            description="Aggregate stats across the season: rounds, entries, winners, hours of footage."
            id="bucket-9-season-stats"
          />

          {/* Bucket 10 — Battle Notes */}
          <BucketPlaceholder
            number={10}
            title="Battle Notes"
            description="Field notes from the curator — what's working, what's breaking, what's next."
            id="bucket-10-battle-notes"
          />

          {/* Bucket 11 — Now Watching */}
          <section id="bucket-11-now-watching">
            <NowWatching />
          </section>

          {/* Google Search Preview (supporting visual) */}
          <GoogleSearchPreview />
        </div>

        {/* Bucket 12 — Legal (Footer) */}
        <div id="bucket-12-legal">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;
