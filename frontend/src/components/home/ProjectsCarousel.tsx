"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "./ProjectsCarousel.module.css";
import Button from "../Button";
import UpArrowRight from "../icons/UpArrowRight";

interface Project {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const projects: Project[] = [
  {
    title: "F3Global Website",
    description:
      "Designing a website and admin portal to provide microloan and entrepreneurial support for small businesses.",
    image: "/images/projects/f3-thumbnail.png",
    slug: "f3global-website",
  },
  {
    title: "HoMEwork Revamp",
    description:
      "Website highlighting HoMEwork's available resources, including events, contact information, donating, and news.",
    image: "/images/projects/homework-thumbnail.png",
    slug: "homework-revamp",
  },
  {
    title: "F3Global Website 2",
    description:
      "Designing a website and admin portal to provide microloan and entrepreneurial support for small businesses.",
    image: "/images/projects/f3-thumbnail.png",
    slug: "f3global-website-2",
  },
  {
    title: "HoMEwork Revamp 2",
    description:
      "Website highlighting HoMEwork's available resources, including events, contact information, donating, and news.",
    image: "/images/projects/homework-thumbnail.png",
    slug: "homework-revamp-2",
  },
];

export default function ProjectsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [baseOffset, setBaseOffset] = useState(0);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)));
  }, []);

  // The active card's center aligns with the viewport's center, except for
  // the first card, which is clamped so it never leaves empty space before
  // the start of the track
  const recomputeOffset = useCallback(() => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[activeIndex];
    if (!viewport || !card) return;

    const viewportCenter = viewport.clientWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const centeredOffset = viewportCenter - cardCenter;

    setBaseOffset(Math.min(0, centeredOffset));
  }, [activeIndex]);

  useLayoutEffect(() => {
    recomputeOffset();
  }, [recomputeOffset]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !window.ResizeObserver) {
      window.addEventListener("resize", recomputeOffset);
      return () => window.removeEventListener("resize", recomputeOffset);
    }

    const observer = new ResizeObserver(recomputeOffset);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [recomputeOffset]);

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <h2 className={styles.title}>
          Projects that stand the{" "}
          <span className={styles.accent}>test of time.</span>
        </h2>

        <p className={styles.description}>
          We believe that technology should be utilized to better the community.
          Something as simple as a sleek, usable website or a mobile app to
          track donations can create a huge impact on an organization of any
          size. In the past 8 years, we&apos;ve provided software services
          pro-bono for 25+ organizations.
        </p>

        <p className={styles.description}>
          Curious what we&apos;ve created? Scroll to explore our selected
          projects here.
        </p>

        <Link href="/projects">
          <Button> View All Projects</Button>
        </Link>
      </div>

      <div className={styles.viewport} ref={viewportRef}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(${baseOffset}px)`,
            transition: "transform 0.45s ease",
          }}
        >
          {/* BEGIN CARD */}
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={`/projects/${project.slug}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.card} ${
                index === activeIndex ? styles.cardActive : ""
              }`}
              onClick={(e) => {
                if (index !== activeIndex) {
                  e.preventDefault();
                  goToIndex(index);
                }
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 80vw, 320px"
                  draggable={false}
                />
                <span
                  className={`${styles.imageArrow} ${
                    index === activeIndex ? styles.imageArrowVisible : ""
                  }`}
                >
                  <UpArrowRight stroke="#FFFFFB" width={25} height={25} />
                </span>
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
            </Link>
          ))}
          {/* END CARD */}
          <div>
            <Button>See More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
