import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  loading?: boolean;
  ghost?: boolean;
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "red" | "green" | "orange" | "yellow" | "purple" | "pink";
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { rootClassName = "", children, loading, sizes = "md", ghost, color, ...restProps },
  ref
) => {
  const sizeClassName = `button-${sizes}`;

  const colorClassName = () => {
    if (!ghost && !color) return "";

    if (ghost && !color) return `button-ghost`;

    if (ghost && color) return `button-ghost button-ghost-${color}`;

    return `button-${color}`;
  };

  return (
    <button ref={ref} className={`button ${sizeClassName} ${colorClassName()} ${rootClassName}`} {...restProps}>
      {loading && <FaSpinner className="button-icon" />}
      <span>{children}</span>
    </button>
  );
};

export default React.forwardRef(Button);
