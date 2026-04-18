"use client";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  style?: React.CSSProperties;
};

export const Input = ({ value, onChange, placeholder, type = "text", style, name }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      style={style}
      className="border rounded-xl h-15 w-full px-5"
    />
  );
};
