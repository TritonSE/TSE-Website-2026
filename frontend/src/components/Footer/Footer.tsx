import styles from "./Footer.module.css";
import { Clock, InternalLinks, Mission, OutboundLinks } from "./FooterParts";
import type { FooterPage } from "./footerLinks";

export type { FooterPage };

/** Current hour and minute in San Diego, as two-digit strings. */
function getPacificTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
  }).formatToParts(new Date());

  return {
    hour: parts.find((part) => part.type === "hour")?.value,
    minute: parts.find((part) => part.type === "minute")?.value,
  };
}

/*
 * Both layouts are rendered; CSS shows one based on screen width
 * (breakpoint in Footer.module.css). This keeps the footer a server
 * component with no layout flash on load.
 */
export default function Footer({ active }: { active?: FooterPage }) {
  const { hour, minute } = getPacificTime();

  return (
    <footer className={styles.footer}>
      {/* Desktop: 2x2 grid */}
      <div className={styles.desktop}>
        <Mission variant="desktop" />
        <Clock
          variant="desktop"
          className={styles.desktopClock}
          hour={hour}
          minute={minute}
        />
        <InternalLinks
          variant="desktop"
          className={ styles.desktopLinks}
          active={active}
        />
        <OutboundLinks variant="desktop" className={styles.desktopOutbound} />
      </div>

      <div className={styles.mobile}>
        <OutboundLinks variant="mobile" className={styles.mobileOutbound} />
        <InternalLinks variant="mobile" active={active} />
        <Mission variant="mobile" />
        <Clock variant="mobile" hour={hour} minute={minute} />
      </div>
    </footer>
  );
}
