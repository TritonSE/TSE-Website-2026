import Link from "next/link";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Triton Software Engineering</span>

          <h1 className={styles.heading}>
            Crafting digital solutions for nonprofit organizations in our
            community.
          </h1>
        </div>

        <div className={styles.ctas}>
          <Link href="/members" className={styles.cta}>
            <span className={styles.ctaLabel}>Join Our Team</span>
          </Link>

          <Link href="/contact" className={styles.cta}>
            <span className={styles.ctaLabel}>Contact Us</span>
          </Link>
        </div>
      </div>

      <div className={styles.location}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.locationText}>San Diego, CA</span>
      </div>
    </section>
  );
}
