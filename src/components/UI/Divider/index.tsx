import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  plain?: boolean;
  verticalSize?: number;
  placement?: "left" | "center" | "right";
  type?: "horizontal" | "vertical";
}

const Divider: React.ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  {
    rootClassName = "",
    type = "horizontal",
    verticalSize = 20,
    children,
    plain,
    placement = "left",
    ...restProps
  },
  ref
) => {
  const placementClassName = `divider-${placement}`;

  const plainClassName = plain ? `divider-plain` : "";

  const showHorizontal = type === "horizontal";

  const showVertical = type === "vertical";

  const verticalStyle = { height: `${verticalSize}px` };

  return (
    <div
      {...restProps}
      ref={ref}
      className={`divider ${placementClassName} ${plainClassName} ${rootClassName}`}
    >
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
