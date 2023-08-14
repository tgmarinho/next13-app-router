export type HeadingProps = {
  title: string;
  color: 'white' | 'black';
  size: 'small' | 'medium';
  isUppercase?: boolean;
};

export default function Heading({ title, color, size, isUppercase = false }: HeadingProps) {
  return (
    <h4
      className={`mb-6 border-l-4 border-blue-600 px-2  font-bold ${
        (color === 'white' && 'text-white') || (color === 'black' && 'text-black')
      } ${(size === 'small' && 'text-lg') || (size === 'medium' && ' text-xl')} ${
        isUppercase && 'uppercase'
      }`}
    >
      {title}
    </h4>
  );
}
