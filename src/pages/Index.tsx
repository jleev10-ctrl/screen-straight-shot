import joy from "@/assets/joy.jpg";
import test from "@/assets/test.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-[100] flex h-[52px] items-center justify-between border-b border-[#2a2a2a] bg-[rgba(10,10,10,0.95)] px-6 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="text-[16px] font-bold uppercase tracking-[0.08em] text-[#c9a84c]">Storage Locker</span>
          <span className="ml-0.5 text-[10px] uppercase tracking-[0.2em] text-[#9a9080]">Studios</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden border-b-2 border-[#2a2a2a] px-4 py-8 text-center sm:px-[300px] sm:py-7"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, #151B24 0%, #121212 100%)" }}>
        {/* left image — fades to right */}
        <img
          src={joy}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden h-full w-auto object-cover sm:block"
          style={{ WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(90deg, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)" }}
        />
        {/* right image — fades to left */}
        <img
          src={test}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden h-full w-auto object-cover sm:block"
          style={{ WebkitMaskImage: "linear-gradient(270deg, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(270deg, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)" }}
        />
        {/* centre glow */}
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(30,50,80,0.55) 0%, transparent 70%)" }} />

        <div className="relative z-[6] mb-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-white">
          Season 01 — Active Now
        </div>
        <h1 className="relative z-[6] mb-2.5 text-[clamp(36px,6vw,80px)] font-extrabold uppercase leading-[0.92] tracking-[0.06em]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            backgroundImage: "linear-gradient(180deg,#fff 0%,#ffe94d 8%,#ffd700 22%,#f5c842 38%,#e8a800 55%,#ffd700 72%,#ffe94d 86%,#fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(2px 4px 0px rgba(60,30,0,0.9)) drop-shadow(4px 6px 0px rgba(40,20,0,0.6)) drop-shadow(0 0 24px rgba(255,200,0,0.5))",
          }}>
          Make Money<br />Making Movies
        </h1>
        <div className="relative z-[6] mt-3 text-[clamp(12px,1.5vw,17px)] font-bold uppercase tracking-[0.16em] text-white"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)" }}>
          Earn your sponsorship. Build your car. Find the engine.
        </div>
      </section>
    </div>
  );
};

export default Index;
