import React from "react";
import Spinner from "../Loading/Spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  loading?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "red" | "green" | "orange" | "yellow" | "purple" | "pink";
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { rootClassName = "", children, loading, sizes = "md", ghost, color, disabled, ...restProps },
  ref
) => {
  const btnDisabled = disabled || loading;

  const sizeClassName = `button-${sizes}`;

  const disabledClassName = disabled ? "button-disabled" : "";

  const loadingClassName = loading ? "button-loading" : "";

  const colorClassName = () => {
    if (!ghost && !color) return "";
    if (ghost && !color) return `button-ghost`;
    if (!ghost && color) return `button-color button-${color}`;
    if (ghost && color) return `button-ghost button-ghost-${color}`;
  };

  return (
    <button
      {...restProps}
      ref={ref}
      disabled={btnDisabled}
      className={`button ${sizeClassName} ${colorClassName()} ${loadingClassName} ${disabledClassName} ${rootClassName}`}
    >
      {loading && <Spinner rootClassName="button-icon" />}
      <span>{children}</span>
    </button>
  );
};

export default React.forwardRef(Button);
