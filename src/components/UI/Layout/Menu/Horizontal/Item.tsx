import React from "react";
import { MenuItem, MenuItems } from "../type";
import { HiOutlineChevronRight } from "react-icons/hi2";

interface MenuHorizontalItemProps {
  item: MenuItem;
  activeId: string[];
  childed: boolean | undefined;
  childClassName: string;
  hasChild: boolean | undefined;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  renderMenu: (list?: MenuItems, childed?: boolean) => React.ReactNode;
  handleOpenMenu: (id: string) => void;
}

const MenuHorizontalItem: React.FC<MenuHorizontalItemProps> = ({
  item,
  activeId,
  childed,
  childClassName,
  hasChild,
  itemClassName,
  itemStyle,
  renderMenu,
  handleOpenMenu,
}) => {
  const actived = activeId.includes(item.id);

  const labelActiveClassName = actived ? "item-label-active" : "";

  const dropDownActiveClassName = actived ? "item-dropdown-active" : "";

  return (
    <div
      style={itemStyle}
      className={`horizontal-item ${childClassName} ${itemClassName}`}
      onMouseEnter={() => handleOpenMenu(item.id)}
      onMouseLeave={() => handleOpenMenu(item.id)}
    >
      <div className={`item-label ${labelActiveClassName}`}>
        <div className="label-content">
          {item.icon && <div className="content-icon">{item.icon}</div>}
          <div className="content-text">{item.label}</div>
        </div>

        {hasChild && childed && (
          <div className="label-arrow">
            <HiOutlineChevronRight />
          </div>
        )}
      </div>

      {hasChild && (
        <div className={`item-dropdown ${dropDownActiveClassName}`}>{renderMenu(item.children, true)}</div>
      )}
    </div>
  );
};

export default MenuHorizontalItem;
