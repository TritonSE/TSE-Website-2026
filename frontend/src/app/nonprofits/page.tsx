import HeroSection from "@/components/HeroSection";

export default function NonprofitsPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Your Brand Here"
        headline="Nonprofits."
        // "Nonprofits." is 5.16em wide and clips past the right gutter at the
        // default 19.84vw. 18vw is the widest ramp that still fits.
        headlineFontSize="clamp(64px, 18vw, 272px)"
        outlineCta={{ label: "Our Approach", href: "#approach" }}
        solidCta={{ label: "Apply Now", href: "#apply" }}
      />
    </main>
  );
}
