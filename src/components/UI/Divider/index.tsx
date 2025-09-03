import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { DividerContentPlacement, DividerType } from "./type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  plain?: boolean;
  dashed?: boolean;
  verticalSize?: number;
  placement?: DividerContentPlacement;
  type?: DividerType;
}

const Divider: ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  {
    rootClassName = "",
    type = "horizontal",
    verticalSize = 100,
    children,
    plain,
    dashed,
    placement = "left",
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const placementClassName = `divider-${placement}`;

  const plainClassName = plain ? "divider-plain" : "";

  const dashClassName = dashed ? "divider-dashed" : "";

  const inlineClassName = type === "vertical" ? "divider-inline" : "";

  const themeClassName = `divider-${theme}`;

  const showHorizontal = type === "horizontal";

  const showVertical = type === "vertical";

  const verticalStyle = { height: `${verticalSize}px` };

  const className = utils.formatClassName(
    "divider",
    placementClassName,
    plainClassName,
    dashClassName,
    inlineClassName,
    themeClassName,
    rootClassName
  );

  return (
    <div ref={ref} {...restProps} className={className}>
      {showHorizontal && (
        <div className="divider-horizontal">
          {children && <div className="horizontal-content">{children}</div>}
        </div>
      )}

      {showVertical && (
        <div style={verticalStyle} className="divider-vertical">
          {children && <div className="vertical-content">{children}</div>}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Divider);
