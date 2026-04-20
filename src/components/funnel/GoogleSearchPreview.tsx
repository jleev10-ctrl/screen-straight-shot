import curtainsBg from "@/assets/now-watching-curtains.jpg";

export const GoogleSearchPreview = () => {
  return (
    <section
      aria-labelledby="google-search-preview-heading"
      className="rounded-lg border border-border bg-card/40 px-4 py-5 md:px-6"
    >
      <div
        id="google-search-preview-heading"
        className="mx-auto w-full max-w-[600px] overflow-hidden rounded-lg border border-border/30 bg-white shadow-sm"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="px-4 pb-3 pt-4 md:px-[18px]">
          <div className="mb-1 flex items-center gap-1.5 text-xs">
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
              › arena
            </span>
          </div>

          <h3
            className="my-1 text-lg leading-snug md:text-xl"
            style={{ color: "#1a0dab" }}
          >
            Storage Locker Studios — Battle of the Engines
          </h3>
        </div>

        <img
          src={curtainsBg}
          alt="Red stage curtains closed before a film begins"
          className="block aspect-video w-full object-cover"
          loading="lazy"
        />

        <p className="px-4 py-3 text-sm leading-relaxed md:px-[18px]" style={{ color: "#4d5156" }}>
          <span className="font-bold" style={{ color: "#202124" }}>
            Curtain state.
          </span>{" "}
          The red curtains stay visible here until a movie is added.
        </p>
      </div>
    </section>
  );
};
