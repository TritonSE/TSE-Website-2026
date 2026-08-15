"use client";

import CountUp from "@/components/CountUp";

import styles from "./ImpactStats.module.css";

type Stat = {
  value: number;
  suffix: string;
  description: string;
};

const stats: Stat[] = [
  {
    value: 100,
    suffix: "",
    description:
      "members, including developers, designers, product managers, and leadership",
  },
  {
    value: 60,
    suffix: "+",
    description:
      "projects fully shipped and live, from websites to internal platforms to mobile apps",
  },
  {
    value: 82,
    suffix: "%",
    description:
      "of alumni have worked or currently work at industry-leading companies",
  },
];

export default function ImpactStats() {
  return (
    <section className={styles.section}>
      <div className={styles.stats}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.description}>
            <div className={styles.number}>
              <CountUp
                to={stat.value}
                from={0}
                direction="up"
                delay={0}
                duration={1}
                className={styles.countUp}
                startWhen={true}
                separator=""
              />
              {stat.suffix}
            </div>

            <p className={styles.description}>{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
