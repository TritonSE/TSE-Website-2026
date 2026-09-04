import styles from "./NameTag.module.css";

interface NameTagProps {
  name: string;
}

export default function NameTag({ name }: NameTagProps) {
  return (
    <div className={styles.nameTag}>
      <span className={styles.circle} aria-hidden="true" />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
