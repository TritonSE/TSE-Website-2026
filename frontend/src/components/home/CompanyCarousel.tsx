"use client";

import LogoLoop from "@/components/reactbits/LogoLoop/LogoLoop";
import styles from "./CompanyCarousel.module.css";

const companyLogos = [
  { src: "/logos/adobe.png", alt: "Adobe" },
  { src: "/logos/amazon.png", alt: "Amazon" },
  { src: "/logos/apple.png", alt: "Apple" },
  { src: "/logos/bain.png", alt: "Bain" },
  { src: "/logos/chase.png", alt: "Chase" },
  { src: "/logos/coinbase.png", alt: "Coinbase" },
  { src: "/logos/databricks.png", alt: "Databricks" },
  { src: "/logos/deloitte.png", alt: "Deloitte" },
  { src: "/logos/doordash.png", alt: "DoorDash" },
  { src: "/logos/Figma-logo.svg", alt: "Figma" },
  { src: "/logos/Google_Favicon_2025.svg", alt: "Google" },
  { src: "/logos/janestreet.jpg", alt: "Jane Street" },
  {
    src: "/logos/Meta_Platforms_Inc._logo_(cropped).svg",
    alt: "Meta",
  },
  { src: "/logos/microsoft.png", alt: "Microsoft" },
  { src: "/logos/netflix.png", alt: "Netflix" },
  { src: "/logos/nvidia.png", alt: "NVIDIA" },
  { src: "/logos/openai.svg", alt: "OpenAI" },
  { src: "/logos/ramp.png", alt: "Ramp" },
  { src: "/logos/robinhood.png", alt: "Robinhood" },
  { src: "/logos/Roblox_Logo_2025.png", alt: "Roblox" },
  { src: "/logos/servicenow.png", alt: "ServiceNow" },
  { src: "/logos/snowflake.png", alt: "Snowflake" },
  { src: "/logos/spacex.png", alt: "SpaceX" },
  { src: "/logos/stripe.png", alt: "Stripe" },
  { src: "/logos/tesla.png", alt: "Tesla" },
  { src: "/logos/tiktok.png", alt: "TikTok" },
];

export default function CompanyCarousel() {
  const firstRow = companyLogos.filter((_, index) => index % 2 === 0);
  const secondRow = companyLogos.filter((_, index) => index % 2 === 1);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Our members work at...</h2>

      <div className={styles.carousel}>
        <LogoLoop
          logos={firstRow}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={120}
          pauseOnHover={false}
          fadeOut={false}
          scaleOnHover={false}
          ariaLabel="Companies our members work for"
        />
      </div>
      <div className={styles.carousel}>
        <LogoLoop
          logos={secondRow}
          speed={100}
          direction="right"
          logoHeight={60}
          gap={100}
          pauseOnHover={false}
          fadeOut={false}
          scaleOnHover={false}
          ariaLabel="Companies our members work for"
        />
      </div>
    </section>
  );
}
