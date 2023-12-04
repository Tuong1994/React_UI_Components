import React from "react";
import { ComponentColor, ComponentSize } from "@/common/type";
import Spinner from "../Loading/Spinner";
import FormContext from "@/components/Control/Form/FormContext";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  loading?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "white">;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { rootClassName = "", children, loading, sizes = "md", ghost, color, disabled, ...restProps },
  ref
) => {
  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const btnDisabled = disabled || loading;

  const buttonColor = rhfColor ? rhfColor : color;

  const buttonSize = rhfSizes ? rhfSizes : sizes;

  const sizeClassName = `button-${buttonSize}`;

  const disabledClassName = disabled ? "button-disabled" : "";

  const loadingClassName = loading ? "button-loading" : "";

  const colorClassName = () => {
    if (!ghost && !buttonColor) return "";
    if (ghost && !buttonColor) return `button-ghost`;
    if (!ghost && buttonColor) return `button-color button-${buttonColor}`;
    if (ghost && buttonColor) return `button-ghost button-ghost-${buttonColor}`;
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
