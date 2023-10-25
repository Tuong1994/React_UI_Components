import React from "react";
import { BreadcrumbItems } from "./type";

export interface BreadcrumbProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  items?: BreadcrumbItems;
  separator?: React.ReactNode | React.ReactNode[];
}

const Breadcrumb: React.ForwardRefRenderFunction<HTMLDivElement, BreadcrumbProps> = (
  { rootClassName = "", style, items = [], separator = "/" },
  ref
) => {
  const renderItems = () => {
    return items.map((item, idx) => (
      <div key={item.id} className="breadcrumb-item">
        <div className="item-label">{item.label}</div>
        {idx !== items.length - 1 && <div className="item-separator">{separator}</div>}
      </div>
    ));
  };

  return (
    <div ref={ref} style={style} className={`breadcrumb ${rootClassName}`}>
      {renderItems()}
    </div>
  );
};

export default React.forwardRef(Breadcrumb);
