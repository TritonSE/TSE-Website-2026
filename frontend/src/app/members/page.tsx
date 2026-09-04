import Navbar from "@/components/layout/Navbar";
import WorkWithUs from "@/components/members/WorkWithUs";

import styles from "./page.module.css";

export default function MembersPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <WorkWithUs />
    </main>
  );
}
