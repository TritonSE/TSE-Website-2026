import HeroSection from "@/components/HeroSection";

export default function MembersPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Calling all designers & developers"
        headline="Members."
        outlineCta={{ label: "See Open Roles", href: "#roles" }}
        solidCta={{ label: "Apply Now", href: "#apply" }}
      />
    </main>
  );
}
