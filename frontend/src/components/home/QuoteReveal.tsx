"use client";

import { useEffect, useState } from "react";

import styles from "./QuoteReveal.module.css";

const quote =
  "“Triton Software Engineering solved the problem we had been wrestling with for five years.”";

export default function QuoteReveal() {
  const [progress, setProgress] = useState(0);

  const words = quote.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      const revealStart = window.innerHeight * 0.25;
      const revealDistance = window.innerHeight * 1.25;

      const scrolled = window.scrollY - revealStart;
      const progress = scrolled / revealDistance;

      setProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initiallyRevealedWords = 3;

  const revealedWords =
    initiallyRevealedWords +
    Math.ceil(progress * (words.length - initiallyRevealedWords));

  const showAttribution = progress >= 1;

  return (
    <section className={styles.section}>
      <div className={styles.sticky}>
        <p className={styles.quote}>
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`${styles.word} ${
                index < revealedWords ? styles.revealed : ""
              }`}
            >
              {word}{" "}
            </span>
          ))}
        </p>

        <div
          className={`${styles.attribution} ${
            showAttribution ? styles.attributionVisible : ""
          }`}
        >
          <span>BOBBY KAN</span>
          <span className={styles.divider} />
          <span>CEO, FUTURE FORWARD FOUNDATION</span>
        </div>
      </div>
    </section>
  );
}
