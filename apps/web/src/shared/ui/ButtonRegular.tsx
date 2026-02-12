interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonRegular({ children, className = "" }: ButtonProps) {
  return (
    <div
      className={`bg-gray flex h-11 w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
