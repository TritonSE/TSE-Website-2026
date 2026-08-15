import Button from "./Button";
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
          <Button href="/members" variant="dark">
            Join Our Team
          </Button>

          <Button href="/contact" variant="light" arrow>
            Contact Us
          </Button>
        </div>
      </div>

      <div className={styles.location}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.locationText}>San Diego, CA</span>
      </div>
    </section>
  );
}
