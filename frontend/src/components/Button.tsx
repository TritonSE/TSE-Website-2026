import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "dark" | "light";

type ButtonProps = {
  children: ReactNode;
  /** Renders a Next.js Link when set, otherwise a <button>. */
  href?: string;
  /** Color scheme. "dark" = frosted -> black on hover, "light" = solid light. */
  variant?: ButtonVariant;
  /** Show the chevron that slides right on hover. */
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6 6L1 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({
  children,
  href,
  variant = "dark",
  arrow = false,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.icon} aria-hidden="true">
          <Chevron />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
