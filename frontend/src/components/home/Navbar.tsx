"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

import styles from "./Navbar.module.css";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/icons/tse-logo.svg"
          alt="Triton Software Engineering"
          width={21}
          height={29}
        />
      </Link>

      <div className={styles.links}>
        <Link
          href="/about"
          className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}
        >
          <FlipText>About</FlipText>
        </Link>

        <Link
          href="/team"
          className={`${styles.navLink} ${pathname === "/team" ? styles.active : ""}`}
        >
          <FlipText>Team</FlipText>
        </Link>

        <Link
          href="/projects"
          className={`${styles.navLink} ${pathname === "/projects" ? styles.active : ""}`}
        >
          <FlipText>Projects</FlipText>
        </Link>

        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownButton}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
          >
            <FlipText>Work With Us</FlipText>

            <svg
              className={`${styles.chevron} ${
                isOpen ? styles.chevronOpen : ""
              }`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/members" className={styles.dropdownItem}>
                Members
              </Link>

              <Link href="/nonprofits" className={styles.dropdownItem}>
                Nonprofits
              </Link>

              <Link href="/sponsors" className={styles.dropdownItem}>
                Sponsors
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
