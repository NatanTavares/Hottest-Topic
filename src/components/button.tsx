export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const btnClass = `
  inline-flex justify-center items-center items-center px-2.5 py-1.5 
  rounded  shadow-sm 
  text-xs font-medium text-white text-center
  bg-indigo-700 hover:bg-indigo-800 
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
  transition duration-150 ease-in-out
`;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={btnClass} {...rest}>
      {children}
    </button>
  );
};
