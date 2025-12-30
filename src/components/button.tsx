import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button 
            className={"bg-primary hover:bg-primary/80 text-white p-2.5 rounded-lg transition-all z-10 cursor-pointer text-sm"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;