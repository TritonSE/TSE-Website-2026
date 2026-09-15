import HeroSection from "@/components/HeroSection";

export default function TeamPage() {
  return (
    <main>
      <HeroSection
        eyebrow="100 Members"
        headline="Team."
        outlineCta={{ label: "Our Culture", href: "#culture" }}
        solidCta={{ label: "Join Us", href: "/members" }}
      />
    </main>
  );
}
