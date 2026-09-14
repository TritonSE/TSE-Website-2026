import Button from "./Button";
import Magnet from "./reactbits/Magnet/Magnet";
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

        <div className={styles.mobileLocation}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.locationText}>San Diego, CA</span>
        </div>

        <div className={styles.ctas}>
          <Magnet padding={40} magnetStrength={14}>
            <Button
              href="/members"
              variant="dark"
              className={styles.heroButton}
            >
              Join Our Team
            </Button>
          </Magnet>

          <Magnet padding={40} magnetStrength={14}>
            <Button
              href="/contact"
              variant="light"
              arrow
              className={styles.heroButton}
            >
              Contact Us
            </Button>
          </Magnet>
        </div>
      </div>

      <div className={styles.desktopLocation}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.locationText}>San Diego, CA</span>
      </div>
    </section>
  );
}
