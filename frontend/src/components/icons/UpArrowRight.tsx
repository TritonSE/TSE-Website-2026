import type { SVGProps } from "react";

interface UpArrowRightProps extends SVGProps<SVGSVGElement> {
  stroke?: string;
}

export default function UpArrowRight({
  stroke = "#9B9B9B",
  ...props
}: UpArrowRightProps) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.800029 11.6334L11.6334 0.800049M0.800029 0.800049H11.6334V11.6334"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
