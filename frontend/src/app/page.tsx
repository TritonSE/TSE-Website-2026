import Footer from "@/components/home/Footer";
import ImpactStats from "@/components/home/ImpactStats";
import Hero from "@/components/Hero";
import Navbar from "@/components/home/Navbar";
import PixelWaveHero from "@/components/PixelWaveHero";
import QuoteReveal from "@/components/home/QuoteReveal";
import CompanyCarousel from "@/components/home/CompanyCarousel";

export default function Home() {
  return (
    <main>
      <div
        style={{
          position: "relative",
          height: "350vh",
        }}
      >
        {/* Quote sits behind the hero */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: 0,
          }}
        >
          <QuoteReveal />
        </div>

        {/* Hero sits on top and scrolls upward normally */}
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "100vh",
            zIndex: 1,
            backgroundColor: "#050505",
          }}
        >
          <PixelWaveHero src="/images/great-wave_small_transparent.png" />
          <Navbar />
          <Hero />
        </section>
      </div>

      {/* Everything after the quote is normal page flow */}

      <CompanyCarousel />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#08090a",
          fontSize: "48px",
        }}
      >
        <ImpactStats />
        <Footer />
      </section>
    </main>
  );
}
