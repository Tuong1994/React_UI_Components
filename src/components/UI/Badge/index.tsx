import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { BadgeColor, BadgeShape } from "./type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  ghost?: boolean;
  color?: BadgeColor;
  shape?: BadgeShape;
}

const Badge: ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClassName = "", ghost, color, shape = "round", children, ...restProps },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const shapeClassName = `badge-${shape}`;

  const themeClassName = `badge-${theme}`;

  const colorClassName = () => {
    if (ghost && !color) return "badge-ghost";
    if (!ghost && color) return `badge-color badge-${color}`;
    if (ghost && color) return `badge-ghost badge-ghost-${color}`;
    return "";
  };

  const className = utils.formatClassName(
    "badge",
    colorClassName(),
    shapeClassName,
    themeClassName,
    rootClassName
  );

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(Badge);
