import React from "react";
import { BreadcrumbItems } from "./type";
import { HiChevronRight } from "react-icons/hi2";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  items?: BreadcrumbItems;
  separator?: React.ReactNode | React.ReactNode[];
}

const Breadcrumb: React.ForwardRefRenderFunction<HTMLDivElement, BreadcrumbProps> = (
  {
    rootClassName = "",
    itemClassName = "",
    itemStyle,
    items = [],
    separator = <HiChevronRight size={14} />,
    ...restProps
  },
  ref
) => {
  const renderItems = () => {
    return items.map((item, idx) => {
      const activeClassName = item.actived ? "item-label-active" : "";
      return (
        <div key={item.id} style={itemStyle} className={`breadcrumb-item ${itemClassName}`}>
          <div className={`item-label ${activeClassName}`}>{item.label}</div>
          {idx !== items.length - 1 && <div className="item-separator">{separator}</div>}
        </div>
      );
    });
  };

  return (
    <div ref={ref} {...restProps} className={`breadcrumb ${rootClassName}`}>
      {renderItems()}
    </div>
  );
};

export default React.forwardRef(Breadcrumb);
