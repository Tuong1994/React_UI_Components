import { FC } from "react";
import { DynamicGridItems } from "./type";

interface GridOneItemProps {
  items: DynamicGridItems;
}

const GridOneItem: FC<GridOneItemProps> = ({ items = [] }) => {
  return (
    <div className="grid-one-item">
      {items.map((item) => (
        <div key={item.id} className="item-content">
          {item.node}
        </div>
      ))}
    </div>
  );
};

export default GridOneItem;
