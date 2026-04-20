export const Manifesto = () => {
  return (
    <section id="manifesto" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-mono text-primary uppercase tracking-widest">01 — Manifesto</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Why I'm building this
        </h2>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-foreground/90 leading-relaxed">
        <p className="text-lg">
          Filmmaking used to need a crew of fifty and a checkbook to match. That
          gate is gone. What's left is taste, persistence, and the patience to
          stitch a hundred imperfect tools into one good story.
        </p>
        <p>
          The <strong className="text-primary">Tap Movie Engine</strong> is my
          attempt to do exactly that — assemble the best of what's available,
          point it at a single creative target, and ship something only a stubborn
          generalist would attempt.
        </p>
        <p>
          No guarantees anyone shows up. No promises about partners. Just the work,
          out in the open, and a place for fellow travelers to throw their best
          clips into the ring.
        </p>
        <p className="text-muted-foreground italic">
          — c'est la vie, let's see what happens.
        </p>
      </div>
    </section>
  );
};
