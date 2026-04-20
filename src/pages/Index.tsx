import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/funnel/Hero";
import { Manifesto } from "@/components/funnel/Manifesto";
import { ToolsSidebar } from "@/components/funnel/ToolsSidebar";
import { SubmissionForm } from "@/components/funnel/SubmissionForm";
import { Footer } from "@/components/funnel/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Tap Movie Engine — AI Filmmaking Funnel";
  }, []);

  return (
    <>
      <Helmet>
        <title>Tap Movie Engine — AI Filmmaking & Featured AI Videos</title>
        <meta
          name="description"
          content="Building the Tap Movie Engine. Submit your AI-generated video — the best ones get featured on X. Manifesto, tools, and curated AI filmmaking."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="min-h-screen bg-hero">
        <Hero />

        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
            <div className="space-y-20">
              <Manifesto />
              <SubmissionForm />
            </div>
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <ToolsSidebar />
            </aside>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Index;
