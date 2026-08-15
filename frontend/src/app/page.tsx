import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main
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
      <Hero />
    </main>
  );
}
