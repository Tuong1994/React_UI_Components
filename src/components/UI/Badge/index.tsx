import React from "react";

export interface BadgeProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  ghost?: boolean;
  color?: "blue" | "green" | "orange" | "red" | "yellow" | "purple" | "pink";
}

const Badge: React.ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClassName = "", style, ghost, color, children },
  ref
) => {
  const colorClassName = () => {
    if (ghost && !color) return "badge-ghost";
    if (!ghost && color) return `badge-${color}`;
    if (ghost && color) return `badge-ghost badge-ghost-${color}`;
    return "";
  };

  return (
    <div ref={ref} style={style} className={`badge ${colorClassName()} ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(Badge);
