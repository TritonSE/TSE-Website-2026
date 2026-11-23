import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FAQ from "@/components/FAQ/FAQ";
import { faqSections } from "./faqContent";
import Timeline from "@/components/members/Timeline";
import styles from "./page.module.css";
export const metadata: Metadata = {
  title: "Members | Triton Software Engineering",
  description: "Frequently asked questions for prospective TSE members.",
};

export default function MembersPage() {
  return (
    <main className={styles.page}>
      <HeroSection
        eyebrow="Calling all designers & developers"
        headline="Members."
        outlineCta={{ label: "See Open Roles", href: "#roles" }}
        solidCta={{ label: "Apply Now", href: "#apply" }}
      />
      <Timeline />
      <FAQ sections={faqSections} />
    </main>
  );
}
