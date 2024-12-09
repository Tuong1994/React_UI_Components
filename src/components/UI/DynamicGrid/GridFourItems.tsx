import { FC } from "react";
import { DynamicGridItems } from "./type";

interface GridFourItemsProps {
  items: DynamicGridItems;
}

const GridFourItems: FC<GridFourItemsProps> = ({ items = [] }) => {
  return (
    <div className="grid-four-items">
      {items.map((item) => (
        <div key={item.id} className="item-content">
          {item.node}
        </div>
      ))}
    </div>
  );
};

export default GridFourItems;
