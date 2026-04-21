import curtainsBg from "@/assets/now-watching-curtains.jpg";

export const GoogleSearchPreview = () => {
  return (
    <section
      aria-labelledby="google-search-preview-heading"
      className="rounded-lg border border-border bg-card/40 px-4 py-5 md:px-6"
    >
      <div
        id="google-search-preview-heading"
        className="w-full overflow-hidden rounded-lg border border-border/30 bg-white shadow-sm"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <img
          src={curtainsBg}
          alt="Red stage curtains closed before a film begins"
          className="block aspect-video w-full object-cover"
          loading="lazy"
        />

        <p className="px-4 py-3 text-sm leading-relaxed md:px-[18px]" style={{ color: "#4d5156" }}>
          When is your red carpet day...
        </p>
      </div>
    </section>
  );
};
