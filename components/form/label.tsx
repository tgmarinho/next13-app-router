import { LabelHTMLAttributes } from 'react';

type LabelProps = {
  color: 'white' | 'black';
} & LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ color, ...props }: LabelProps) {
  return (
    <label
      className={`pl-2 text-sm md:text-base font-semibold tracking-wider ${
        (color === 'white' && 'text-white') || (color === 'black' && 'text-black')
      }`}
      {...props}
    />
  );
}
