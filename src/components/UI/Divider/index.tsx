import React from "react";

export interface DividerProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  plain?: boolean;
  verticalSize?: number;
  placement?: "left" | "center" | "right";
  type?: "horizontal" | "vertical";
}

const Divider: React.ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  { rootClassName = "", style, type = "horizontal", verticalSize = 20, children, plain, placement = "left" },
  ref
) => {
  const placementClassName = `divider-${placement}`;

  const plainClassName = plain ? `divider-plain` : "";

  const showHorizontal = type === "horizontal";

  const showVertical = type === "vertical";

  const verticalStyle = { height: `${verticalSize}px` };

  return (
    <div ref={ref} style={style} className={`divider ${placementClassName} ${plainClassName} ${rootClassName}`}>
      {showHorizontal && (
        <div className="divider-horizontal">
          <div className="horizontal-content">{children}</div>
        </div>
      )}

      {showVertical && <div style={verticalStyle} className="divider-vertical" />}
    </div>
  );
};

export default React.forwardRef(Divider);
