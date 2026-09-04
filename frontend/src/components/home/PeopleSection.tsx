import fs from "node:fs";
import path from "node:path";

import Button from "@/components/Button";

import PeopleGrid from "./PeopleGrid";
import styles from "./PeopleSection.module.css";

interface Member {
  name: string;
  src: string;
}

function getMembers(): Member[] {
  const membersDirectory = path.join(process.cwd(), "public", "members");

  return fs
    .readdirSync(membersDirectory)
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    .sort()
    .map((file) => {
      const name = file
        .replace(/\.[^/.]+$/, "")
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

      return {
        name,
        src: `/members/${file}`,
      };
    });
}

export default function PeopleSection() {
  const members = getMembers();

  return (
    <section className={styles.section}>
      <PeopleGrid members={members} />

      <div className={styles.content}>
        <h2 className={styles.title}>
          It&apos;s the <span>people</span> who
          <br />
          make it happen.
        </h2>

        <div className={styles.copy}>
          <p>
            As a powerhouse of 96 members, including our board, 49 developers,
            19 product designers, and 12 TEST members, we make up the tight-knit
            and collaborative community here at Triton Software Engineering.
          </p>

          <p>
            We&apos;re always growing, and would love to meet you if you&apos;re
            interested in joining.
          </p>
        </div>

        <Button href="/join" variant="dark">
          JOIN OUR TEAM
        </Button>
      </div>
    </section>
  );
}
