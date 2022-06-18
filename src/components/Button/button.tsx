import type { ButtonProps } from "./button.types";

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="w-16 h-16 bg-gray-700 rounded hover:brightness-90 delay-75 duration-100"
      {...rest}
    >
      {children}
    </button>
  );
};
