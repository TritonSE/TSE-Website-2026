"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Link href="/about" className={styles.navLink}>
          About
        </Link>

        <Link href="/team" className={styles.navLink}>
          Team
        </Link>

        <Link href="/projects" className={styles.navLink}>
          Projects
        </Link>

        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownButton}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
          >
            <span className={styles.dropdownLabel}>Work With Us</span>

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
