import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import PhotoRow from "@/components/home/PhotoRow";

import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About | Triton Software Engineering",
  description:
    "Learn about Triton Software Engineering's mission, history, values, and community at UC San Diego.",
};

const values = [
  {
    title: "Innovation",
    description:
      "We turn nonprofit challenges into creative technical solutions, building tools that don't just work, but work well.",
  },
  {
    title: "Education",
    description:
      "Every project is a chance to learn by doing, growing our technical skills while making a real impact.",
  },
  {
    title: "Collaboration",
    description:
      "We build alongside each other and our nonprofit partners, because the best solutions come from working as one team.",
  },
  {
    title: "Service",
    description:
      "We exist to give back, using our skills to empower the nonprofits doing good in our community.",
  },
];

const teamPhotos = Array.from(
  { length: 7 },
  (_, index) => `/images/about/team-${index + 1}.jpg`,
);

function Location() {
  return (
    <p className={styles.location}>
      <span className={styles.locationDot} aria-hidden="true" />
      San Diego, CA
    </p>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.waveBackground} aria-hidden="true" />
        <Navbar />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Est. 2017</p>
          <h1 className={styles.title} data-title="About.">
            <span className={styles.titleTexture}>About.</span>
          </h1>
          <div className={styles.heroButtons}>
            <Button href="#mission">Our mission</Button>
            <Button href="/contact" variant="light" arrow>
              Contact us
            </Button>
          </div>
        </div>

        <div className={styles.heroLocation}>
          <Location />
        </div>
      </section>

      <section className={styles.mission} id="mission">
        <Image
          className={styles.missionImage}
          src="/images/about/mission.jpg"
          alt="TSE members walking through a sunlit San Diego landscape"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.missionShade} aria-hidden="true" />
        <p className={styles.missionStatement}>
          TSE&apos;s mission is to craft digital solutions for nonprofit
          organizations in our community.
        </p>
      </section>

      <section className={styles.story}>
        <div className={styles.storyWave} aria-hidden="true" />
        <div className={styles.storyCopy}>
          <h2>How We Started.</h2>
          <p className={styles.storyDate}>Est. 2017</p>
          <p>
            In Spring of 2017, a group of passionate students saw a huge
            problem: Many nonprofit organizations had little to no resources to
            procure professional web and technical development services.
          </p>
          <p>
            In response, they banded together to create Triton Software
            Engineering. By providing a venue for both UCSD students and
            nonprofits to connect, they hoped to foster growth in both social
            good and technical expertise.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.valuesPhoto}>
          <Image
            src="/images/about/values-left.jpg"
            alt="TSE members gathered in a tree"
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
          />
        </div>

        <div className={styles.valuesContent}>
          <p className={styles.valuesLabel}>Our values</p>
          <ol className={styles.valuesList}>
            {values.map((value) => (
              <li key={value.title}>
                <h2>{value.title}</h2>
                <p>{value.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.valuesPhoto}>
          <Image
            src="/images/about/values-right.jpg"
            alt="TSE members smiling together"
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
          />
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.teamCopy}>
          <h2>More than a team</h2>
          <p>
            When not heads-down designing and developing, we set time aside to
            create opportunities to bond through socials, games, and mentorship.
            We care about celebrating each other&apos;s successes as well! As a
            member in TSE, you gain valuable skills and a network of talented
            peers who share a drive to do good for the community.
          </p>
          <Button href="/members">Join now</Button>
        </div>
        <PhotoRow
          photos={teamPhotos}
          direction="left"
          alt="TSE members spending time together"
        />
      </section>

      <Footer />
    </main>
  );
}
