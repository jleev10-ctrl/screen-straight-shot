export const EmployeeIntro = () => {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
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
