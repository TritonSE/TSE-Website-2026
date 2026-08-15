import Footer from "@/components/home/Footer";
import ImpactStats from "@/components/home/ImpactStats";
import Navbar from "@/components/home/Navbar";
import QuoteReveal from "@/components/home/QuoteReveal";

export default function Home() {
  return (
    <main>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url('/images/great-wave.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
      </section>

      <QuoteReveal />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffffb",
          color: "#08090a",
          fontSize: "48px",
        }}
      >
        <ImpactStats/>
        <Footer/>
      </section>
    </main>
  );
}
