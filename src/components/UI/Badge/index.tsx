import React from "react";
import { ComponentColor } from "@/common/type";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  ghost?: boolean;
  color?: Exclude<ComponentColor, "white">;
}

const Badge: React.ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClassName = "", ghost, color, children, ...restProps },
  ref
) => {
  const colorClassName = () => {
    if (ghost && !color) return "badge-ghost";
    if (!ghost && color) return `badge-color badge-${color}`;
    if (ghost && color) return `badge-ghost badge-ghost-${color}`;
    return "";
  };

  return (
    <div {...restProps} ref={ref} className={`badge ${colorClassName()} ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(Badge);
