import type { SVGProps } from "react";

export const Sent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-check-circle'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
    <path d='m9 11 3 3L22 4'></path>
  </svg>
);
