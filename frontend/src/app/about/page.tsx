import HeroSection from "@/components/HeroSection";

export default function AboutPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Est. 2017"
        headline="About."
        outlineCta={{ label: "Our Mission", href: "#mission" }}
        solidCta={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
