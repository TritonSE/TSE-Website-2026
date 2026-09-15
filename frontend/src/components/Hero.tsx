import BlinkingLocation from "./BlinkingLocation";
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

        <div className={styles.ctas}>
          <Magnet padding={40} magnetStrength={14}>
            <Button href="/members" variant="dark">
              Join Our Team
            </Button>
          </Magnet>

          <Magnet padding={40} magnetStrength={14}>
            <Button href="/contact" variant="light" arrow>
              Contact Us
            </Button>
          </Magnet>
        </div>
      </div>

      <BlinkingLocation className={styles.location} />
    </section>
  );
}
