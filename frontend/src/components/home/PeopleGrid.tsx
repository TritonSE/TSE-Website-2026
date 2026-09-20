// PeopleGrid.tsx

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

interface MobileSlot {
  member: Member | null;
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

const rowOffsets: Record<number, number> = {
  1: 0,
  2: -0.15,
  3: 0.1,
  4: -0.075,
  5: 0.45,
};

const mobileRowOffsets = [-18, 12, -8, 20, -14, 8];

function buildMobileSlots(members: Member[]): MobileSlot[] {
  const slots: MobileSlot[] = [];

  const gapColumns: Array<number | null> = [null, 3, null, 5, null, 2];

  let memberIndex = 0;
  let row = 1;

  while (memberIndex < members.length) {
    const gapColumn = gapColumns[(row - 1) % gapColumns.length];

    for (let column = 1; column <= 6; column += 1) {
      if (column === gapColumn) {
        slots.push({
          member: null,
          column,
          row,
        });

        continue;
      }

      if (memberIndex >= members.length) {
        break;
      }

      slots.push({
        member: members[memberIndex],
        column,
        row,
      });

      memberIndex += 1;
    }

    row += 1;
  }

  return slots;
}

function getObjectPosition(name: string) {
  if (
    name === "Alice Guo" ||
    name === "Jaden Huang" ||
    name === "Ishayu Ghosh" ||
    name === "Kate Songpetchmongkol" ||
    name === "Juee Deshmukh" ||
    name === "Alice Park"
  ) {
    return "center 45%";
  }

  if (name === "Joyce Ren" || name === "Kalyssa Choy") {
    return "center 35%";
  }

  return "center top";
}

export default function PeopleGrid({ members }: PeopleGridProps) {
  const [cursor, setCursor] = useState<CursorState | null>(null);

  if (members.length === 0) {
    return null;
  }

  const mobileSlots = buildMobileSlots(members);

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
    <>
      <div className={`${styles.mosaic} ${styles.desktopMosaic}`}>
        {positions.map((position, index) => {
          const member = members[(index * 7) % members.length];

          return (
            <div
              key={`${member.src}-desktop-${index}`}
              className={styles.memberCard}
              style={{
                gridColumn: position.column,
                gridRow: position.row,
                translate: `calc(var(--tile-size) * ${
                  rowOffsets[position.row]
                }) 0`,
              }}
              onPointerEnter={(event) => handlePointerMove(event, member.name)}
              onPointerMove={(event) => handlePointerMove(event, member.name)}
              onPointerLeave={() => setCursor(null)}
            >
              <Image
                src={member.src}
                alt={member.name}
                fill
                sizes="80px"
                className={styles.memberImage}
                style={{
                  objectPosition: getObjectPosition(member.name),
                }}
              />
            </div>
          );
        })}
      </div>

      <div className={`${styles.mosaic} ${styles.mobileMosaic}`}>
        {mobileSlots.map((slot) => {
          if (!slot.member) {
            return (
              <div
                key={`gap-${slot.row}-${slot.column}`}
                className={styles.mobileGap}
                style={{
                  gridColumn: slot.column,
                  gridRow: slot.row,
                }}
              />
            );
          }

          const member = slot.member;

          const offset =
            mobileRowOffsets[(slot.row - 1) % mobileRowOffsets.length];

          return (
            <div
              key={`${member.src}-mobile`}
              className={styles.memberCard}
              style={{
                gridColumn: slot.column,
                gridRow: slot.row,
                translate: `${offset}px 0`,
              }}
              onPointerEnter={(event) => handlePointerMove(event, member.name)}
              onPointerMove={(event) => handlePointerMove(event, member.name)}
              onPointerLeave={() => setCursor(null)}
            >
              <Image
                src={member.src}
                alt={member.name}
                fill
                sizes="64px"
                className={styles.memberImage}
                style={{
                  objectPosition: getObjectPosition(member.name),
                }}
              />
            </div>
          );
        })}
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
    </>
  );
}
