import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Manifesto } from "@/components/funnel/Manifesto";
import { ToolsSidebar } from "@/components/funnel/ToolsSidebar";

const Index = () => {
  useEffect(() => {
    document.title = "Tap Movie Engine — Manifesto";
  }, []);

  return (
    <>
      <Helmet>
        <title>Tap Movie Engine — Manifesto</title>
        <meta
          name="description"
          content="The Tap Movie Engine manifesto — building the future of AI filmmaking."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="min-h-screen bg-hero px-4 py-16">
        <div className="w-full max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_320px]">
          <Manifesto />
          <aside className="lg:sticky lg:top-16 lg:self-start">
            <ToolsSidebar />
          </aside>
        </div>
      </main>
    </>
  );
};

export default Index;
