import HeroSection from "@/components/HeroSection";

export default function SponsorsPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Calling all designers & developers"
        headline="Sponsors."
        outlineCta={{ label: "See Open Roles", href: "#roles" }}
        solidCta={{ label: "Apply Now", href: "#apply" }}
      />
    </main>
  );
}
