"use client";

import { useState, type PointerEvent } from "react";

import LogoLoop from "@/components/reactbits/LogoLoop/LogoLoop";
import NameTag from "./NameTag";
import styles from "./CompanyCarousel.module.css";

const companyLogos = [
  { src: "/logos/adobe.png", alt: "Adobe" },
  { src: "/logos/amazon.png", alt: "Amazon" },
  { src: "/logos/apple.png", alt: "Apple" },
  { src: "/logos/bain.png", alt: "Bain" },
  { src: "/logos/chase.png", alt: "Chase" },
  { src: "/logos/citadel.png", alt: "Citadel" },
  { src: "/logos/cloudflare.png", alt: "Cloudflare" },
  { src: "/logos/coinbase.png", alt: "Coinbase" },
  { src: "/logos/databricks.png", alt: "Databricks" },
  { src: "/logos/deloitte.png", alt: "Deloitte" },
  { src: "/logos/doordash.png", alt: "DoorDash" },
  { src: "/logos/figma.png", alt: "Figma" },
  { src: "/logos/google.png", alt: "Google" },
  { src: "/logos/janestreet.png", alt: "Jane Street" },
  { src: "/logos/meta.png", alt: "Meta" },
  { src: "/logos/microsoft.png", alt: "Microsoft" },
  { src: "/logos/netflix.png", alt: "Netflix" },
  { src: "/logos/nvidia.png", alt: "NVIDIA" },
  { src: "/logos/openai.png", alt: "OpenAI" },
  { src: "/logos/oracle.png", alt: "Oracle" },
  { src: "/logos/ramp.png", alt: "Ramp" },
  { src: "/logos/robinhood.png", alt: "Robinhood" },
  { src: "/logos/roblox.png", alt: "Roblox" },
  { src: "/logos/servicenow.png", alt: "ServiceNow" },
  { src: "/logos/snapchat.png", alt: "Snapchat" },
  { src: "/logos/snowflake.png", alt: "Snowflake" },
  { src: "/logos/southwest.png", alt: "Southwest" },
  { src: "/logos/spacex.png", alt: "SpaceX" },
  { src: "/logos/stripe.png", alt: "Stripe" },
  { src: "/logos/tesla.png", alt: "Tesla" },
  { src: "/logos/tiktok.png", alt: "TikTok" },
  { src: "/logos/uber.png", alt: "Uber" },
];

interface CursorState {
  name: string;
  x: number;
  y: number;
}

export default function CompanyCarousel() {
  const firstRow = companyLogos.filter((_, index) => index % 2 === 0);
  const secondRow = companyLogos.filter((_, index) => index % 2 === 1);

  const [cursor, setCursor] = useState<CursorState | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      setCursor(null);
      return;
    }

    const logoItem = target.closest(".logoloop__item");

    if (!logoItem) {
      setCursor(null);
      return;
    }

    const image = logoItem.querySelector("img");

    if (!image) {
      setCursor(null);
      return;
    }

    setCursor({
      name: image.alt,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerLeave = () => {
    setCursor(null);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Our members work at...</h2>

      <div
        className={styles.carousel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <LogoLoop
          logos={firstRow}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={120}
          pauseOnHover={true}
          fadeOut={false}
          scaleOnHover={false}
          ariaLabel="Companies our members work for"
        />
      </div>

      <div
        className={styles.carousel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <LogoLoop
          logos={secondRow}
          speed={100}
          direction="right"
          logoHeight={60}
          gap={120}
          pauseOnHover={true}
          fadeOut={false}
          scaleOnHover={false}
          ariaLabel="Companies our members work for"
        />
      </div>

      {cursor && (
        <div
          className={styles.nameCursor}
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          <NameTag name={cursor.name} />
        </div>
      )}
    </section>
  );
}
