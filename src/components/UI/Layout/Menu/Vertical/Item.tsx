import React from "react";
import { MenuItem } from "../type";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Tooltip } from "@/components/UI";
import useLayoutStore from "../../LayoutStore";
import { LayoutColor } from "../../Context";

interface MenuVerticalItemProps {
  item: MenuItem;
  activeId: string[];
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  color?: LayoutColor;
  handleSelectMenu: (id: string) => void;
}

const MenuVerticalItem: React.FC<MenuVerticalItemProps> = ({
  item,
  activeId,
  itemClassName = "",
  itemStyle,
  color = "blue",
  handleSelectMenu,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const shrinked = useLayoutStore((state) => state.shrinked);

  const hasChild = item.children && item.children.length > 0;

  const actived = hasChild ? open : activeId.includes(item.id);

  const showTooltipContent = shrinked && item.isRoot && !hasChild;

  const labelActiveClassName = actived && !hasChild ? "item-label-active" : "";

  const childActiveClassName = actived && hasChild ? "item-children-active" : "";

  const iconActiveClassName = actived && hasChild ? "label-arrow-active" : "";

  const shrinkClassName = shrinked ? "vertical-item-shrinked" : "";

  const rootClassName = item.isRoot ? "item-children-root" : "";

  const handleOpen = () => (hasChild ? setOpen(!open) : handleSelectMenu(item.id));

  return (
    <div style={itemStyle} className={`vertical-item ${shrinkClassName} ${itemClassName}`}>
      <Tooltip
        placement="right"
        color={color}
        content={showTooltipContent ? item.label : ""}
        rootClassName="item-tooltip-wrap"
        titleClassName={`item-label ${labelActiveClassName}`}
        onClick={handleOpen}
      >
        <div className="label-content">
          {item.icon && <div className="content-icon">{item.icon}</div>}
          <div className="content-text">{item.label}</div>
        </div>

        {hasChild && (
          <div className={`label-arrow ${iconActiveClassName}`}>
            <HiOutlineChevronDown className="arrow-icon" />
          </div>
        )}
      </Tooltip>

      {hasChild && (
        <div className={`item-children ${rootClassName} ${childActiveClassName}`}>
          {item.children &&
            item.children.map((item) => (
              <MenuVerticalItem
                key={item.id}
                item={item}
                color={color}
                activeId={activeId}
                itemStyle={itemStyle}
                itemClassName={itemClassName}
                handleSelectMenu={handleSelectMenu}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuVerticalItem;
