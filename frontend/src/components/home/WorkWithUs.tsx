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

import Button from "@/components/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import OptionWheel, {
  type OptionWheelHandle,
} from "@/components/reactbits/OptionWheel/OptionWheel";

import styles from "./WorkWithUs.module.css";

interface WorkWithUsCard {
  label: string;
  image: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const cards: WorkWithUsCard[] = [
  {
    label: "SPONSORS",
    image: "/images/dial/dial-3.png",
    description:
      "With zero student fees and working completely pro-bono for our clients, we appreciate any sponsorships or donations to help offset our costs. Reach out to find out how you can make a difference today.",
    primary: { label: "Learn More", href: "/sponsors" },
    secondary: { label: "Sponsor Us", href: "/sponsors#contact" },
  },
  {
    label: "MEMBERS",
    image: "/images/dial/dial-1.png",
    description:
      "Interested in joining TSE as a designer or developer? Our applications open in mid-September every Fall quarter. Connect with us at our info sessions and many other recruiting events every year.",
    primary: { label: "View All Projects", href: "/projects" },
    secondary: { label: "Apply", href: "/apply" },
  },
  {
    label: "NONPROFITS",
    image: "/images/dial/dial-2.png",
    description:
      "Is your non-profit interested in working with us? We look for new clients every spring through summer, but reach out at any time of year with questions. Learn more about our workflow below!",
    primary: { label: "Learn More", href: "/nonprofits" },
    secondary: { label: "Contact Us", href: "/contact" },
  },
];

const wheelItems = cards.map((card) => card.label);

const CLONE_COUNT = 3;
const leadingClones = cards.slice(-CLONE_COUNT);
const trailingClones = cards.slice(0, CLONE_COUNT);
const extendedCards = [...leadingClones, ...cards, ...trailingClones];

function realIndexOf(extendedIndex: number) {
  return (
    (((extendedIndex - CLONE_COUNT) % cards.length) + cards.length) %
    cards.length
  );
}

const CARD_TRANSITION_MS = 500;

export default function WorkWithUs() {
  const [activeIndex, setActiveIndex] = useState(1);
  const wheelRef = useRef<OptionWheelHandle>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [baseOffset, setBaseOffset] = useState(0);
  const [current, setCurrent] = useState(activeIndex + CLONE_COUNT);
  const [trackTransition, setTrackTransition] = useState(true);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Which nav button triggered the in-flight transition, so only that one
  // shows as disabled instead of both.
  const [lastPressed, setLastPressed] = useState<"prev" | "next" | null>(
    null,
  );

  const goToIndex = (index: number) => {
    if (isTransitioning) return;
    const next = ((index % cards.length) + cards.length) % cards.length;
    wheelRef.current?.goTo(next);
  };

  const recomputeOffset = useCallback(() => {
    const card = cardRefs.current[current];
    if (!card) return;

    setBaseOffset(-card.offsetLeft);
  }, [current]);

  useLayoutEffect(() => {
    recomputeOffset();
  }, [recomputeOffset]);

  if (activeIndex !== prevActiveIndex) {
    const direction =
      (((activeIndex - prevActiveIndex) % cards.length) + cards.length) %
      cards.length;
    setPrevActiveIndex(activeIndex);
    setTrackTransition(true);
    setIsTransitioning(true);

    if (direction === 1) {
      setCurrent((c) => c + 1);
    } else if (direction === cards.length - 1) {
      setCurrent((c) => c - 1);
    } else {
      setCurrent(activeIndex + CLONE_COUNT);
    }
  }

  useEffect(() => {
    const isClone =
      current < CLONE_COUNT || current >= extendedCards.length - CLONE_COUNT;
    if (!isClone) return;

    const id = setTimeout(() => {
      setTrackTransition(false);
      setCurrent(CLONE_COUNT + realIndexOf(current));
    }, CARD_TRANSITION_MS);
    return () => clearTimeout(id);
  }, [current]);

  // Unlock input once the step's transition has had time to finish.
  useEffect(() => {
    if (!isTransitioning) return;
    const id = setTimeout(() => {
      setIsTransitioning(false);
      setLastPressed(null);
    }, CARD_TRANSITION_MS);
    return () => clearTimeout(id);
  }, [isTransitioning]);

  useEffect(() => {
    if (trackTransition) return;
    const id = requestAnimationFrame(() => setTrackTransition(true));
    return () => cancelAnimationFrame(id);
  }, [trackTransition]);

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>
          Let&rsquo;s create something{" "}
          <span className={styles.accent}>impactful</span> together.
        </h2>
        <p className={styles.body}>
          We&rsquo;re always looking for creators, collaborators, organizations,
          and sponsors to join us and help us grow. Reach out and we&rsquo;ll
          get back to you as soon as we can.
        </p>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Previous"
            disabled={isTransitioning && lastPressed === "prev"}
            onClick={() => {
              setLastPressed("prev");
              goToIndex(activeIndex - 1);
            }}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Next"
            disabled={isTransitioning && lastPressed === "next"}
            onClick={() => {
              setLastPressed("next");
              goToIndex(activeIndex + 1);
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.wheel}>
        <OptionWheel
          ref={wheelRef}
          items={wheelItems}
          defaultSelected={activeIndex}
          side="left"
          loop
          fontSize={1}

          spacing={6}
          tilt={10}
          curve={1.0}
          blur={1}
          inset={0}
          offsetX={28}
          notches
          notchWidth={10}
          notchActiveWidth={15}
          textColor="#5c6269"
          activeColor="#fffffb"
          soundUrl="tick.wav"
          onChange={(index) => setActiveIndex(index)}
        />
      </div>

      <div className={styles.cardsViewport} ref={viewportRef}>
        <div
          className={`${styles.cardsTrack} ${
            trackTransition ? "" : styles.noTransition
          }`}
          style={{
            transform: `translateX(${baseOffset}px)`,
          }}
        >
          {extendedCards.map((card, index) => {
            const realIndex = realIndexOf(index);
            const isActive = index === current;

            return (
              <div
                key={`${card.label}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${styles.card} ${
                  isActive ? styles.cardActive : ""
                }`}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    goToIndex(realIndex);
                  }
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 80vw, 420px"
                  />
                </div>
                <p className={styles.cardDescription}>{card.description}</p>
                <div className={styles.cardActions}>
                  <Link href={card.primary.href}>
                    <Button variant="dark">{card.primary.label}</Button>
                  </Link>
                  <Link href={card.secondary.href}>
                    <Button variant="light" arrow>
                      {card.secondary.label}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
