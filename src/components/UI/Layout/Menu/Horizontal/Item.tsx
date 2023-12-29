import React from "react";
import { MenuItem } from "../type";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useRender } from "@/hooks";
import utils from "@/utils";

interface MenuHorizontalItemProps {
  item: MenuItem;
  activeId: string[];
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  handleOpenMenu: (id: string) => void;
}

const MenuHorizontalItem: React.FC<MenuHorizontalItemProps> = ({
  itemClassName = "",
  item,
  activeId,
  itemStyle,
  handleOpenMenu,
}) => {
  const hasChild = item.children && item.children.length > 0;

  const actived = activeId.includes(item.id);

  const labelActiveClassName = actived ? "item-label-active" : "";

  const dropDownActiveClassName = actived ? "item-dropdown-active" : "";

  const mainClassName = utils.formatClassName("horizontal-item", itemClassName);

  const labelClassName = utils.formatClassName("item-label", labelActiveClassName);

  const dropdownClassName = utils.formatClassName("item-dropdown", dropDownActiveClassName);

  const render = useRender(actived);

  return (
    <div
      style={itemStyle}
      className={mainClassName}
      onMouseEnter={() => handleOpenMenu(item.id)}
      onMouseLeave={() => handleOpenMenu(item.id)}
    >
      <div className={labelClassName}>
        <div className="label-content">
          {item.icon && <div className="content-icon">{item.icon}</div>}
          <div className="content-text">{item.label}</div>
        </div>

        {hasChild && !item.isRoot && (
          <div className="label-arrow">
            <HiOutlineChevronRight />
          </div>
        )}
      </div>

      {hasChild && render && (
        <div className={dropdownClassName}>
          {item.children &&
            item.children.map((item) => (
              <MenuHorizontalItem
                key={item.id}
                item={item}
                activeId={activeId}
                itemStyle={itemStyle}
                itemClassName={itemClassName}
                handleOpenMenu={handleOpenMenu}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuHorizontalItem;
