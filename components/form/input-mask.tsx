import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

type InputProps = {
  name: string;
  mask: string;
  withBorder?: boolean;
  color: "white" | "black"
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputMaskCustom({ mask, name, withBorder, color, ...props }: InputProps) {
  const { register } = useFormContext();

  return (
    <>
      <InputMask
        className={`w-full rounded-md tracking-widest text-lg border border-transparent p-3 shadow-md outline-none focus:border-blue-600 ${
          withBorder && 'border-gray-200'
        }
        ${color === "white" && "bg-gray-100 text-black placeholder:text-gray-400"}
          ${color === "black" && "bg-gray-900 text-white placeholder:text-gray-200"}
          `}
        mask={mask}
        {...register(name)}
        {...props}
      ></InputMask>
    </>
  );
}
