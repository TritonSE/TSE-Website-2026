import HeroSection from "@/components/HeroSection";

export default function ProjectsPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Over 60 Shipped"
        headline="Projects."
        outlineCta={{ label: "Our Approach", href: "#approach" }}
        solidCta={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
