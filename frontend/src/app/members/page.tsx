import type { Metadata } from "next";
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
      <Timeline />
      <FAQ sections={faqSections} />
    </main>
  );
}
