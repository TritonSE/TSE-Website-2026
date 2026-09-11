import Image from "next/image";

import styles from "./PhotoRow.module.css";

type PhotoRowProps = {
  photos: string[];
  direction: "left" | "right";
  alt?: string;
};

export default function PhotoRow({
  photos,
  direction,
  alt = "",
}: PhotoRowProps) {
  const directionClass =
    direction === "left" ? styles.scrollLeft : styles.scrollRight;

  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${directionClass}`}>
        {[...photos, ...photos].map((src, index) => (
          <div className={styles.photo} key={`${src}-${index}`}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 600px) 260px, 395px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
