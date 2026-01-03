import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost"
}

const Button = ({ children, ...props }: ButtonProps) => {
  const { variant = "primary" } = props
  
  let classes = "rounded-lg transition-all z-10 cursor-pointer text-sm";
  classes += (variant === "ghost" ? " py-[8px] px-[12px] bg-transparent hover:bg-transparent text-[#B1B1C8] hover:text-white/50 border border-[#484865] hover:border-white/50" : "");
  classes += (variant === "primary" ? " p-2.5 bg-primary hover:bg-primary/80 text-white" : "");

  return (
    <button 
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;