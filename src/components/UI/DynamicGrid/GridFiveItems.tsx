import { FC } from "react";
import { DynamicGridItems } from "./type";

interface GridFiveItemsProps {
  items: DynamicGridItems;
}

const GridFiveItems: FC<GridFiveItemsProps> = ({ items = [] }) => {
  return (
    <div className="grid-five-items">
      <div className="items-group">
        {items.slice(0, 2).map((item) => (
          <div key={item.id} className="item-content">
            {item.node}
          </div>
        ))}
      </div>
      <div className="items-group">
        {items.slice(2, 5).map((item, idx) => {
          const isShowLayer = idx === 2 && items.length > 5;
          return (
            <div key={item.id} className="item-content">
              {item.node}
              {isShowLayer && <div className="content-layer">+ {items.length - 5}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridFiveItems;
