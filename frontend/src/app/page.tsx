import Navbar from "@/components/home/Navbar";
import QuoteReveal from "@/components/home/QuoteReveal";

export default function Home() {
  return (
    <main>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <QuoteReveal />
      </div>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          backgroundImage: "url('/images/great-wave.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
      </section>

      <div style={{ height: "150vh" }} />
    </main>
  );
}
