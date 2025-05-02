import { SVGProps } from "react";

export const Refresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    fill='none'
    stroke='#9333ea'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-refresh-cw'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8'></path>
    <path d='M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16'></path>
    <path d='M8 16H3v5'></path>
  </svg>
);
