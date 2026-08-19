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
}

const projects: Project[] = [
  {
    title: "F3Global Website",
    description:
      "Designing a website and admin portal to provide microloan and entrepreneurial support for small businesses.",
    image: "/images/projects/f3-thumbnail.png",
  },
  {
    title: "HoMEwork Revamp",
    description:
      "Website highlighting HoMEwork's available resources, including events, contact information, donating, and news.",
    image: "/images/projects/homework-thumbnail.png",
  },
  {
    title: "F3Global Website 2",
    description:
      "Designing a website and admin portal to provide microloan and entrepreneurial support for small businesses.",
    image: "/images/projects/f3-thumbnail.png",
  },
  {
    title: "HoMEwork Revamp 2",
    description:
      "Website highlighting HoMEwork's available resources, including events, contact information, donating, and news.",
    image: "/images/projects/homework-thumbnail.png",
  },
];

// Drag distance (px) needed to advance to the next/previous card.
const DRAG_THRESHOLD = 60;
// Accumulated wheel delta (px) needed to advance to the next/previous card.
const WHEEL_THRESHOLD = 50;

export default function ProjectsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [baseOffset, setBaseOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)));
  }, []);

  // The active card's center aligns with the viewport's center, except for
  // the first card, which is clamped so it never leaves empty space before
  // the start of the track (i.e. it stays left-aligned instead of centered).
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

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();

      wheelAccumRef.current += event.deltaY;

      if (wheelResetTimeoutRef.current)
        clearTimeout(wheelResetTimeoutRef.current);
      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, 200);

      if (wheelAccumRef.current > WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        goToIndex(activeIndex + 1);
      } else if (wheelAccumRef.current < -WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0;
        goToIndex(activeIndex - 1);
      }
    },
    [activeIndex, goToIndex],
  );

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging) return;
      setDragOffset(event.clientX - dragStartXRef.current);
    },
    [isDragging],
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > DRAG_THRESHOLD) {
      goToIndex(activeIndex - 1);
    } else if (dragOffset < -DRAG_THRESHOLD) {
      goToIndex(activeIndex + 1);
    }

    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, goToIndex]);

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

      <div
        className={styles.viewport}
        ref={viewportRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(${baseOffset + dragOffset}px)`,
            transition: isDragging ? "none" : "transform 0.45s ease",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.card} ${
                index === activeIndex ? styles.cardActive : ""
              }`}
              onClick={() => goToIndex(index)}
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
            </div>
          ))}
          <div>
            <Button>See More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
