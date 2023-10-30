import React from "react";
import { MenuItems } from "./type";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

export interface LayoutMenuProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
  type?: "horizontal" | "vertical";
}

const LayoutMenu: React.ForwardRefRenderFunction<HTMLDivElement, LayoutMenuProps> = (
  { type = "horizontal", ...restProps },
  ref
) => {
  return (
    <React.Fragment>
      {type === "horizontal" && <Horizontal ref={ref} {...restProps} />}
      {type === "vertical" && <Vertical ref={ref} {...restProps} />}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutMenu);
