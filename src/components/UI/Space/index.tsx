import React from "react";

export interface SpaceProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  size?: "sm" | "md" | "lg" | number;
  justify?: "left" | "center" | "right";
  align?: "top" | "middle" | "bottom";
}

const Space: React.ForwardRefRenderFunction<HTMLDivElement, SpaceProps> = (
  { rootClassName = "", style, children, size = "sm", justify = "left", align = "top" },
  ref
) => {
  const justifyClassName = `space-${justify}`;

  const alignClassName = `space-${align}`;

  const rootStyle = () => {
    if (typeof size === "number") return { ...style, gap: `10px ${size}px` };
    if (size === "sm") return { ...style, gap: "10px" };
    if (size === "md") return { ...style, gap: "10px 30px" };
    if (size === "lg") return { ...style, gap: "10px 60px" };
  };

  return (
    <div ref={ref} style={rootStyle()} className={`space ${justifyClassName} ${alignClassName} ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(Space);
