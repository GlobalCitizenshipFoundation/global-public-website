interface LineProps {
  className?: string;
}

export function BreakLine({ className }: LineProps) {
  return <hr className={`bg-line h-px w-full border-none outline-none ${className}`} />;
}
