"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
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

// Must match the max-width breakpoint in ProjectsCarousel.module.css that
// switches the track from click-to-advance to native scroll + scroll-snap
const MOBILE_QUERY = "(max-width: 900px)";

const isMobileLayout = () => window.matchMedia(MOBILE_QUERY).matches;

// Horizontal distance from a card's left edge to the snap line, which sits
// at the viewport's left edge plus its scroll-padding
function distanceToSnapLine(viewport: HTMLElement, card: HTMLElement) {
  const snapPadding =
    parseFloat(getComputedStyle(viewport).scrollPaddingLeft) || 0;
  return (
    card.getBoundingClientRect().left -
    viewport.getBoundingClientRect().left -
    snapPadding
  );
}

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

  // Mobile: the track scrolls natively, so the active card is whichever one
  // sits closest to the snap line
  const syncActiveFromScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isMobileLayout()) return;

    let nearestIndex = 0;
    let nearestDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(distanceToSnapLine(viewport, card));
      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });
    setActiveIndex(nearestIndex);
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[index];
    if (!viewport || !card) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    viewport.scrollBy({
      left: distanceToSnapLine(viewport, card),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveFromScroll);
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    const viewport = viewportRef.current;

    const handleResize = () => {
      // Desktop clips the viewport and moves the track with a transform, so
      // drop any scroll position left over from the mobile layout
      if (viewport && !isMobileLayout() && viewport.scrollLeft !== 0) {
        viewport.scrollLeft = 0;
      }
      recomputeOffset();
      syncActiveFromScroll();
    };

    if (!viewport || !window.ResizeObserver) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    const observer = new ResizeObserver(handleResize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [recomputeOffset, syncActiveFromScroll]);

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
          style={{ "--track-offset": `${baseOffset}px` } as CSSProperties}
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
                if (index === activeIndex) return;
                e.preventDefault();
                if (isMobileLayout()) {
                  scrollToCard(index);
                } else {
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
                  sizes="(max-width: 900px) 60vw, 400px"
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
          <div className={styles.seeMore}>
            <Button>See More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
