/** Export constants used across the site */

// Application deadline for the 2026-27 cycle. Used to determine 
// if applications are open or closed for certain renderings
export const APPLICATION_DEADLINE = "2026-10-12T23:59:00-07:00";

export const CYCLE_LABEL = "2026-27";

export function isBeforeDeadline(): boolean {
  const now = new Date();
  const deadline = new Date(APPLICATION_DEADLINE);
  return now < deadline;
}