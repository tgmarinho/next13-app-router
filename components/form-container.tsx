
type FormContainerProps = {
  children: React.ReactElement;
  heading?: React.ReactElement;
};

export default function FormContainer({ children, heading }: FormContainerProps) {
  return (
    <div className="group relative flex w-full max-w-2xl flex-col">
      <div className="absolute -inset-0.5 z-[-1] animate-pulse rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
      <div className="rounded-md bg-blue-950 p-12">
        <div className="flex items-center justify-between gap-5 border-b border-blue-500 pb-6">
          <div className="flex">
          </div>
          <div className="hidden self-end md:block">{heading}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
