import { ForwardRefRenderFunction, forwardRef, Fragment, CSSProperties } from "react";
import { TabsColor, TabsItems, TabsType } from "./type";
import TabsHorizontal from "./Horizontal/TabsHorizontal";
import TabsVertical from "./Vertical/TabsVertical";

export interface TabsProps {
  type?: TabsType;
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  style?: CSSProperties;
  headStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  defaultActiveId?: string;
  items: TabsItems;
  color?: TabsColor;
  onSelectTab?: (id: string) => void;
}

const Tabs: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  { type = "horizontal", ...restProps },
  ref
) => {
  return (
    <Fragment>
      {type === "horizontal" && <TabsHorizontal ref={ref} {...restProps} />}
      {type === "vertical" && <TabsVertical ref={ref} {...restProps} />}
    </Fragment>
  );
};

export default forwardRef(Tabs);
