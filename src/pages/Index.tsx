import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Manifesto } from "@/components/funnel/Manifesto";
import { EmployeeIntro } from "@/components/funnel/EmployeeIntro";
import { ToolCard, tools } from "@/components/funnel/ToolsSidebar";

const Index = () => {
  useEffect(() => {
    document.title = "Tap Movie Engine — Making Movies";
  }, []);

  const leftTools = tools.slice(0, 3);
  const rightTools = tools.slice(3, 6);

  return (
    <>
      <Helmet>
        <title>Tap Movie Engine — Making Movies</title>
        <meta
          name="description"
          content="Tap Movie Engine — one operator, six tools, making movies in the open."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="min-h-screen bg-hero px-4 py-12 md:py-16">
        <div className="w-full max-w-6xl mx-auto space-y-16">
          {/* Driver + flanking partners */}
          <section className="grid gap-6 lg:grid-cols-[200px_1fr_200px] lg:items-start">
            <div className="hidden lg:flex flex-col gap-3 lg:pt-16">
              {leftTools.map((t) => (
                <ToolCard key={t.name} tool={t} />
              ))}
            </div>

            <EmployeeIntro />

            <div className="hidden lg:flex flex-col gap-3 lg:pt-16">
              {rightTools.map((t) => (
                <ToolCard key={t.name} tool={t} />
              ))}
            </div>

            {/* Mobile: all 6 tools stacked under video */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              {tools.map((t) => (
                <ToolCard key={t.name} tool={t} />
              ))}
            </div>
          </section>

          {/* Manifesto below */}
          <Manifesto />
        </div>
      </main>
    </>
  );
};

export default Index;
