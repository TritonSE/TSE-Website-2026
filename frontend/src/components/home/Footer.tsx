"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import UpArrowRight from "../icons/UpArrowRight";
import styles from "./Footer.module.css";

const SAN_DIEGO_TIME_ZONE = "America/Los_Angeles";

function getSanDiegoTime(): { hour: string; minute: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SAN_DIEGO_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  return {
    hour: parts.find((part) => part.type === "hour")?.value ?? "00",
    minute: parts.find((part) => part.type === "minute")?.value ?? "00",
  };
}

function useSanDiegoTime() {
  const [time, setTime] = useState(getSanDiegoTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => {
        const next = getSanDiegoTime();

        return next.hour === prev.hour && next.minute === prev.minute
          ? prev
          : next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
}

function FlipDigit({ value }: { value: string }) {
  return (
    <span className={styles.digitSlot}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className={styles.digit}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Clock() {
  const { hour, minute } = useSanDiegoTime();

  return (
    <div className={styles.clockWrapper}>
      <div className={styles.clock}>
        <FlipDigit value={hour[0]} />
        <FlipDigit value={hour[1]} />
        <span className={styles.clockColon}>:</span>
        <FlipDigit value={minute[0]} />
        <FlipDigit value={minute[1]} />
      </div>
      <p className={styles.clockCaption}>
        <span className={styles.dot} />
        Psst! We&apos;re based in San Diego, CA
      </p>
    </div>
  );
}

interface SocialProps {
  href: string;
  children: ReactNode;
}

function Social({ href, children }: SocialProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.social}
    >
      <span className={styles.socialText}>{children}</span>
      <UpArrowRight className={styles.arrow} stroke="currentColor" />
    </Link>
  );
}

function FlipText({ children }: { children: string }) {
  return (
    <motion.span
      className={styles.flipText}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.span
        className={styles.flipTextTop}
        variants={{
          rest: { y: "0%" },
          hover: { y: "-100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.span>

      <motion.span
        className={styles.flipTextBottom}
        variants={{
          rest: { y: "100%" },
          hover: { y: "0%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.section}>
      <div className={styles.row}>
        <div className={styles.description}>
          <p className={styles.p}>
            At Triton Software Engineering, our mission is to craft digital
            solutions for nonprofit organizations in our community.
          </p>
          <p className={styles.p}>
            Thanks for learning more about us. Let’s work together soon!
          </p>
        </div>
        <Clock />
      </div>
      <div className={styles.row}>
        <div className={styles.links}>
          <Link
            href="/"
            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
          >
            <FlipText>Home</FlipText>
          </Link>
          <Link
            href="/members"
            className={`${styles.link} ${pathname === "/members" ? styles.active : ""}`}
          >
            <FlipText>Members</FlipText>
          </Link>
          <Link
            href="/about"
            className={`${styles.link} ${pathname === "/about" ? styles.active : ""}`}
          >
            <FlipText>About</FlipText>
          </Link>
          <Link
            href="/nonprofits"
            className={`${styles.link} ${pathname === "/nonprofits" ? styles.active : ""}`}
          >
            <FlipText>Nonprofits</FlipText>
          </Link>
          <Link
            href="/projects"
            className={`${styles.link} ${pathname === "/projects" ? styles.active : ""}`}
          >
            <FlipText>Projects</FlipText>
          </Link>
          <Link
            href="/sponsors"
            className={`${styles.link} ${pathname === "/sponsors" ? styles.active : ""}`}
          >
            <FlipText>Sponsors</FlipText>
          </Link>
        </div>
        <div className={styles.socials}>
          <Social href="mailto:triton.software.engineering@gmail.com">
            Email
          </Social>
          <Social href="https://www.instagram.com/tse.atucsd">Insta</Social>
          <Social href="https://linkedin.com/company/tritonsoftwareengineering">
            LinkedIn
          </Social>
          <Social href="https://github.com/TritonSE">GitHub</Social>
        </div>
      </div>
    </footer>
  );
}
