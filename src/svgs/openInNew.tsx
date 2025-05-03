import { SVGProps } from "react";

export const OpenInNew = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-external-link'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
  </svg>
);
