import React from "react";
import { ComponentColor, ComponentPlacement } from "@/common/type";

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
  color?: Exclude<ComponentColor, "white" | "gray">;
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
    color = "black",
    content,
    onClick,
  },
  ref
) => {
  const placementClassName = `tooltip-${placement}`;

  const colorClassName = `tooltip-${color}`;

  const arrowColorClassName = `title-arrow-${color}`;

  return (
    <div
      ref={ref}
      style={style}
      className={`tooltip ${placementClassName} ${colorClassName} ${rootClassName}`}
      onClick={onClick}
    >
      <div style={titleStyle} className={`tooltip-title ${titleClassName}`}>
        {children}
        {content && <span className={`title-arrow ${arrowColorClassName}`}></span>}
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
