import React from "react";
import { ComponentPlacement } from "@/common/type";

export interface TooltipProps {
  rootClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  content?: React.ReactNode | React.ReactNode[];
  placement?: ComponentPlacement;
  onClick?: () => void;
}

const Tooltip: React.ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (
  {
    rootClassName = "",
    titleClassName = "",
    contentClassName = "",
    style,
    titleStyle,
    contentStyle,
    children,
    placement = "bottom",
    content,
    onClick,
  },
  ref
) => {
  const placementClassName = `tooltip-${placement}`;

  const arrowClassName = content ? `tooltip-arrow` : "";

  return (
    <div
      ref={ref}
      style={style}
      className={`tooltip ${arrowClassName} ${placementClassName} ${rootClassName}`}
      onClick={onClick}
    >
      <div style={titleStyle} className={`tooltip-title ${titleClassName}`}>
        {children}
      </div>
      {content && (
        <div style={contentStyle} className={`tooltip-content ${contentClassName}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Tooltip);
