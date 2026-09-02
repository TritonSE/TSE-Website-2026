"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";

import NameTag from "./NameTag";
import styles from "./PeopleSection.module.css";

interface Member {
  name: string;
  src: string;
}

interface PeopleGridProps {
  members: Member[];
}

interface CursorState {
  name: string;
  x: number;
  y: number;
}

interface Position {
  column: number;
  row: number;
}

const positions: Position[] = [
  // Row 1
  { column: 1, row: 1 },
  { column: 2, row: 1 },
  { column: 3, row: 1 },
  { column: 4, row: 1 },
  { column: 5, row: 1 },
  { column: 6, row: 1 },
  { column: 7, row: 1 },
  { column: 8, row: 1 },
  { column: 9, row: 1 },
  { column: 10, row: 1 },
  { column: 11, row: 1 },
  { column: 12, row: 1 },

  // Row 2
  { column: 1, row: 2 },
  { column: 2, row: 2 },
  { column: 3, row: 2 },
  { column: 4, row: 2 },
  { column: 5, row: 2 },
  { column: 6, row: 2 },
  { column: 7, row: 2 },
  { column: 8, row: 2 },
  { column: 10, row: 2 },
  { column: 12, row: 2 },

  // Row 3
  { column: 1, row: 3 },
  { column: 3, row: 3 },
  { column: 4, row: 3 },
  { column: 5, row: 3 },
  { column: 6, row: 3 },
  { column: 7, row: 3 },
  { column: 8, row: 3 },
  { column: 9, row: 3 },
  { column: 10, row: 3 },
  { column: 11, row: 3 },
  { column: 12, row: 3 },

  // Row 4
  { column: 1, row: 4 },
  { column: 2, row: 4 },
  { column: 3, row: 4 },
  { column: 5, row: 4 },
  { column: 6, row: 4 },
  { column: 8, row: 4 },
  { column: 9, row: 4 },
  { column: 10, row: 4 },
  { column: 12, row: 4 },

  // Row 5
  { column: 1, row: 5 },
  { column: 2, row: 5 },
  { column: 3, row: 5 },
  { column: 4, row: 5 },
  { column: 5, row: 5 },
  { column: 7, row: 5 },
  { column: 8, row: 5 },
  { column: 10, row: 5 },
];

export default function PeopleGrid({ members }: PeopleGridProps) {
  const [cursor, setCursor] = useState<CursorState | null>(null);

  if (members.length === 0) {
    return null;
  }

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
    name: string,
  ) => {
    setCursor({
      name,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className={styles.mosaic}>
      {positions.map((position, index) => {
        const member = members[(index * 7) % members.length];

        return (
          <div
            key={`${member.src}-${index}`}
            className={styles.memberCard}
            style={{
              gridColumn: position.column,
              gridRow: position.row,
            }}
            onPointerEnter={(event) => handlePointerMove(event, member.name)}
            onPointerMove={(event) => handlePointerMove(event, member.name)}
            onPointerLeave={() => setCursor(null)}
          >
            <Image
              src={member.src}
              alt={member.name}
              fill
              sizes="100px"
              className={styles.memberImage}
              style={{
                objectPosition:
                  member.name === "Alice Guo" || member.name === "Jaden Huang"
                    ? "center 45%"
                    : member.name === "Joyce Ren"
                      ? "center 25%"
                      : "center top",
              }}
            />
          </div>
        );
      })}

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
    </div>
  );
}
