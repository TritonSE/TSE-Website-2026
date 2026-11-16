import styles from "./FooterParts.module.css";
import { contactLinks, internalLinks, type FooterPage } from "./footerLinks";

/*
 * The building blocks of the footer. Each part owns its look and takes a
 * `variant` for the few things that differ between desktop and mobile.
 * Where a part sits on the page is decided by Footer.tsx, via `className`.
 */

type Variant = "desktop" | "mobile";

type PartProps = {
  variant: Variant;
  className?: string;
};

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Mission({ variant, className }: PartProps) {
  return (
    <div className={cx(styles.mission, styles[variant], className)}>
      <p>
        At Triton Software Engineering, our mission is to craft digital
        solutions for nonprofit organizations in our community.
      </p>
      <p>Thanks for learning more about us. Let&apos;s work together soon!</p>
    </div>
  );
}

export function Clock({
  variant,
  className,
  hour,
  minute,
}: PartProps & { hour?: string; minute?: string }) {
  return (
    <div className={cx(styles.clock, styles[variant], className)}>
      <p className={styles.time}>
        {hour}
        <span className={styles.colon}>:</span>
        {minute}
      </p>
      <p className={styles.location}>
        <span className={styles.statusDot} aria-hidden="true" />
        <span>PSST! WE&apos;RE BASED IN SAN DIEGO, CA</span>
      </p>
    </div>
  );
}

export function InternalLinks({
  variant,
  className,
  active,
}: PartProps & { active?: FooterPage }) {
  const links = Object.entries(internalLinks);

  return (
    <nav
      className={cx(styles.internalLinks, styles[variant], className)}
      aria-label="Footer"
      // Desktop fills two columns top to bottom; extra links add rows.
      style={
        { "--link-rows": Math.ceil(links.length / 2) } as React.CSSProperties
      }
    >
      {links.map(([key, link]) => (
        <a
          key={link.href}
          href={link.href}
          title={link.alt}
          className={cx(styles.internalLink, key === active && styles.active)}
          aria-current={key === active ? "page" : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function OutboundLinks({ variant, className }: PartProps) {
  return (
    <div className={cx(styles.outboundLinks, styles[variant], className)}>
      {Object.values(contactLinks).map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.href}
            href={link.href}
            title={link.alt}
            className={styles.outboundLink}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {link.label}
            <ArrowUpperRight />
          </a>
        );
      })}
    </div>
  );
}

function ArrowUpperRight() {
  return (
    <svg
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className={styles.arrow}
    >
      <path
        d="M0.799968 11.6331L11.6333 0.799805M0.799968 0.799805H11.6333V11.6331"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
