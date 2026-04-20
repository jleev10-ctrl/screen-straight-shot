export const EmployeeIntro = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-sm font-mono text-primary uppercase tracking-widest">
          The Employee
        </p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Meet your operator
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-primary/30 shadow-glow bg-card">
        {/* F1-style telemetry frame */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2 px-2 py-1 rounded bg-background/70 backdrop-blur-sm border border-primary/40">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">
            Live Driver
          </span>
        </div>
        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-background/70 backdrop-blur-sm border border-border">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            S01 · Lap 01
          </span>
        </div>

        <video
          src="/employee-intro.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block aspect-video object-cover bg-black"
        />
      </div>

      <p className="text-xs text-muted-foreground italic text-center px-2">
        If we like it, we may display it on X.
      </p>
    </div>
  );
};
