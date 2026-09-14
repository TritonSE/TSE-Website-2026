import Footer from "@/components/home/Footer";
import ImpactStats from "@/components/home/ImpactStats";
import Hero from "@/components/Hero";
import Navbar from "@/components/home/Navbar";
import QuoteReveal from "@/components/home/QuoteReveal";
import CompanyCarousel from "@/components/home/CompanyCarousel";
import PeopleSection from "@/components/home/PeopleSection";
import AboutUs from "@/components/home/AboutUs";
import ProjectsCarousel from "@/components/home/ProjectsCarousel";

import styles from "./page.module.css";

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
        <section className={styles.heroSection}>
          <Navbar />
          <Hero />
        </section>
      </div>

      {/* Everything after the quote is normal page flow */}
      <ProjectsCarousel />

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
        <AboutUs />
        <PeopleSection />
        <Footer />
      </section>
    </main>
  );
}
