import type { SVGProps } from "react";

export const Chevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-chevron-down'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m6 9 6 6 6-6'></path>
  </svg>
);
