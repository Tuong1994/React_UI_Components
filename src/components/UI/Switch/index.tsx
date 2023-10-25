import React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "orange" | "yellow" | "purple" | "pink";
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { rootClassName = "", sizes = "md", color = "blue", ...restProps },
  ref
) => {
  const sizeClassName = `switch-${sizes}`;

  const colorClassName = `switch-${color}`;

  return (
    <input
      {...restProps}
      ref={ref}
      type="checkbox"
      className={`switch ${colorClassName} ${sizeClassName} ${rootClassName}`}
    />
  );
};

export default React.forwardRef(Switch);
