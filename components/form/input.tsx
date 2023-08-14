import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  name: string;
  isTextArea?: boolean;
  withBorder?: boolean;
  color: 'white' | 'black';
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextFiled({
  isTextArea = false,
  name,
  color,
  withBorder,
  ...props
}: InputProps) {
  const { register } = useFormContext();

  return (
    <>
      {isTextArea ? (
        <textarea
          {...props}
          {...register(name)}
          cols={0}
          rows={5}
          className={`max-h-[18rem] w-full rounded-md border-transparent p-3 text-lg tracking-widest shadow-md outline-none placeholder:font-normal focus:border-blue-600 ${
            withBorder && 'border-gray-200 '
          }
          ${color === 'white' && 'bg-gray-100 text-black placeholder:text-gray-400'}
          ${color === 'black' && 'bg-gray-900 text-white placeholder:text-gray-500'}
          `}
        />
      ) : (
        <input
          className={`w-full rounded-md border border-transparent p-3 text-lg tracking-widest shadow-md outline-none focus:border-blue-600 ${
            withBorder && 'border-gray-200 '
          }
          ${color === 'white' && 'bg-gray-100 text-black placeholder:text-gray-400'}
          ${color === 'black' && 'bg-gray-900 text-white placeholder:text-gray-500'}
          ${name === 'numero' && 'text-center'}
          ${name === 'uf' && 'text-center uppercase'}
          `}
          {...register(name)}
          {...props}
        />
      )}
    </>
  );
}
