import React from "react";
import GridContext from "./Context";

export interface GridRowProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  gutters?: [number?, number?];
  justify?: "start" | "center" | "end" | "between" | "evenly" | "around";
  align?: "top" | "middle" | "bottom" | "base";
}

const GridRow: React.ForwardRefRenderFunction<HTMLDivElement, GridRowProps> = (
  { rootClassName = "", style, gutters = [], justify = "start", align = "top", children },
  ref
) => {
  const justifyClassName = `grid-row-${justify}`;

  const alignClassName = `grid-col-${align}`;

  const inlineStyle = () => {
    if (!gutters.length) return { ...style, gap: "10px" };

    if (gutters.length === 1) return { ...style, gap: `${gutters[0]}px` };

    if (gutters.length === 2) return { ...style, rowGap: `${gutters[0]}px`, columnGap: `${gutters[1]}px` };
  };

  return (
    <GridContext.Provider value={{ gutters }}>
      <div
        ref={ref}
        style={inlineStyle()}
        className={`grid-row ${justifyClassName} ${alignClassName} ${rootClassName}`}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
};

export default React.forwardRef(GridRow);
