export const GoogleSearchPreview = () => {
  return (
    <section
      aria-labelledby="google-search-preview-heading"
      className="rounded-lg border border-border bg-card/40 px-6 py-5 space-y-3"
    >
      <p
        id="google-search-preview-heading"
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
      >
        // Google Search Preview
      </p>

      <div
        className="max-w-[600px] rounded-lg bg-white px-[18px] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="mb-0.5 flex items-center gap-1.5 text-xs">
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-sm font-extrabold"
            style={{
              background: "#c9a84c",
              color: "#0a0a0a",
              fontSize: "8px",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            SL
          </span>
          <span className="text-sm" style={{ color: "#202124" }}>
            storagelockerstudios.com
          </span>
          <span className="text-sm" style={{ color: "#5f6368" }}>
            {" "}
            › arena
          </span>
        </div>

        <h3
          className="my-1 cursor-pointer text-xl leading-snug hover:underline"
          style={{ color: "#1a0dab" }}
        >
          Storage Locker Studios — Battle of the Engines
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#4d5156" }}>
          <span className="font-bold" style={{ color: "#202124" }}>
            Season 01 · Episode 03 · Live Now.
          </span>{" "}
          Three AI film engines enter. One earns the vault. Same prompt. Same
          clock. No second chances. Cast your vote — round closes April 07,
          2026.
        </p>
      </div>
    </section>
  );
};
