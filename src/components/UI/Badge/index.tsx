import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  ghost?: boolean;
  color?: "blue" | "green" | "orange" | "red" | "yellow" | "purple" | "pink";
}

const Badge: React.ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClassName = "", ghost, color, children, ...restProps },
  ref
) => {
  const colorClassName = () => {
    if (ghost && !color) return "badge-ghost";
    if (!ghost && color) return `badge-${color}`;
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
