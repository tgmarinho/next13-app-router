import Container from './container';


type BaseProps = {
  children: React.ReactNode;
};

export default function Base({ children }: BaseProps) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Container>
      
      </Container>

      <div className="mt-32 flex-1">{children}</div>

      <div className="bg-black">
        <Container>
        
        </Container>
      </div>
    </div>
  );
}
