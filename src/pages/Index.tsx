import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Manifesto } from "@/components/funnel/Manifesto";

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

      <main className="min-h-screen bg-hero flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl">
          <Manifesto />
        </div>
      </main>
    </>
  );
};

export default Index;
