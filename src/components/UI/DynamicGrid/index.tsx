import { HTMLAttributes, ForwardRefRenderFunction, forwardRef } from "react";
import { DynamicGridItems } from "./type";
import GridOneItem from "./GridOneItem";
import GridTwoItems from "./GridTwoItems";
import GridThreeItems from "./GridThreeItems";
import GridFourItems from "./GridFourItems";
import GridFiveItems from "./GridFiveItems";
import utils from "@/utils";

interface DynamicGridProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  items: DynamicGridItems;
}

const DynamicGrid: ForwardRefRenderFunction<HTMLDivElement, DynamicGridProps> = (
  { rootClassName = "", items = [], ...restProps },
  ref
) => {
  const mainClassName = utils.formatClassName("dynamic-grid", rootClassName);

  return (
    <div ref={ref} {...restProps} className={mainClassName}>
      {items.length === 1 && <GridOneItem items={items} />}
      {items.length === 2 && <GridTwoItems items={items} />}
      {items.length === 3 && <GridThreeItems items={items} />}
      {items.length === 4 && <GridFourItems items={items} />}
      {items.length >= 5 && <GridFiveItems items={items} />}
    </div>
  );
};

export default forwardRef(DynamicGrid);
