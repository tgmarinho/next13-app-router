import React, { ButtonHTMLAttributes } from 'react';

type ButtonCustomProps = {
  children?: React.ReactNode;
  color?: 'blue' | 'white';
  isFull?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonCustom({ color = 'blue', children, isFull, ...props }: ButtonCustomProps) {
  return (
    <button
      {...props}
      className={`cursor-pointer rounded-lg bg-white bg-gradient-to-r p-2 text-sm font-semibold uppercase tracking-widest shadow-sm duration-300 hover:shadow-md md:text-lg 
      ${
        color === 'blue' &&
        'from-blue-500 via-blue-900 to-blue-700 text-white hover:from-blue-400 hover:via-blue-800 hover:to-blue-600'
      }
      ${color === 'white' && 'bg-white text-black'}
      ${isFull && 'w-full'}
        `}
    >
      {children}
    </button>
  );
}
