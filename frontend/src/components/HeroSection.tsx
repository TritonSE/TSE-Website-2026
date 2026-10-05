import BlinkingLocation from "./BlinkingLocation";
import Button from "./Button";
import Navbar from "./Navbar";
import styles from "./HeroSection.module.css";

type CallToAction = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  /** Short gold uppercase line above the headline, e.g. "EST. 2017". */
  eyebrow: string;
  /** The large single-word (or short phrase) headline, e.g. "About." */
  headline: string;
  /** Overrides the default font-size ramp for headlines too wide for the right gutter. */
  headlineFontSize?: string;
  /** Outlined secondary action, rendered first. */
  outlineCta: CallToAction;
  /** Solid primary action with a trailing arrow, rendered second. */
  solidCta: CallToAction;
};

export default function HeroSection({
  eyebrow,
  headline,
  headlineFontSize,
  outlineCta,
  solidCta,
}: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <Navbar />

      <div className={styles.body}>
        <div className={styles.textAndButtons}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>{eyebrow}</span>

            {/* Stacked outline + halftone-fill layers; see HeroSection.module.css. */}
            <h1
              className={styles.heading}
              style={
                headlineFontSize
                  ? ({
                      "--heading-font-size": headlineFontSize,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className={styles.headingOutline} aria-hidden="true">
                {headline}
              </span>
              <span className={styles.headingFill}>{headline}</span>
            </h1>
          </div>

          <div className={styles.ctas}>
            <Button href={outlineCta.href} variant="dark">
              {outlineCta.label}
            </Button>

            <Button href={solidCta.href} variant="light" arrow>
              {solidCta.label}
            </Button>
          </div>
        </div>

        <BlinkingLocation className={styles.location} />
      </div>
    </section>
  );
}
