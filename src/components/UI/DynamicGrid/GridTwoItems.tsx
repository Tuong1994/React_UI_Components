import { FC } from "react";
import { DynamicGridItems } from "./type";

interface GridTwoItemsProps {
  items: DynamicGridItems;
}

const GridTwoItems: FC<GridTwoItemsProps> = ({ items = [] }) => {
  return (
    <div className="grid-two-items">
      {items.map((item) => (
        <div key={item.id} className="item-content">
          {item.node}
        </div>
      ))}
    </div>
  );
};

export default GridTwoItems;
