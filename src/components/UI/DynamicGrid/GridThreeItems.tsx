import { FC } from "react";
import { DynamicGridItems } from "./type";

interface GridThreeItemsProps {
  items: DynamicGridItems;
}

const GridThreeItems: FC<GridThreeItemsProps> = ({ items = [] }) => {
  return (
    <div className="grid-three-items">
      {items.map((item) => (
        <div key={item.id} className="item-content">
          {item.node}
        </div>
      ))}
    </div>
  );
};

export default GridThreeItems;
