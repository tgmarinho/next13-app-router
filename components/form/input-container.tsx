type InputContainerProps = {
  children: React.ReactNode
}

export default function InputContainer({children}: InputContainerProps) {
  return (
    <div className="mb-4 w-full flex flex-col gap-1">
      {children}
    </div>
  )
}