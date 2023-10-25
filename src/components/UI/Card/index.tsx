import React from "react";

export interface CardProps {
  rootClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  head?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  hoverable?: boolean;
}

const Card: React.ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  {
    rootClassName = "",
    headClassName = "",
    bodyClassName = "",
    style,
    headStyle,
    bodyStyle,
    head,
    children,
    hoverable,
  },
  ref
) => {
  const hoverClassName = hoverable ? "card-hover" : "";

  return (
    <div ref={ref} style={style} className={`card ${hoverClassName} ${rootClassName}`}>
      {head && (
        <div style={headStyle} className={`card-head ${headClassName}`}>
          {head}
        </div>
      )}
      
      <div style={bodyStyle} className={`card-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Card);
