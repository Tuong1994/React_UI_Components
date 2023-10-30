import React from "react";
import { MenuItem, MenuItems } from "../type";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Tooltip } from "@/components/UI";
import useLayoutStore from "../../LayoutStore";

interface MenuVerticalItemProps {
  item: MenuItem;
  childed: boolean;
  activeId: string[];
  childClassName: string;
  hasChild: boolean | undefined;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  renderMenu: (list?: MenuItems, childed?: boolean) => React.ReactNode;
  handleSelectMenu: (id: string) => void;
}

const MenuVerticalItem: React.FC<MenuVerticalItemProps> = ({
  item,
  childed,
  activeId,
  childClassName,
  hasChild,
  itemClassName = "",
  itemStyle,
  renderMenu,
  handleSelectMenu,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const shrinked = useLayoutStore((state) => state.shrinked);

  const actived = item.children ? open : activeId.includes(item.id);

  const showTooltipContent = shrinked && !item.children && !childed;

  const labelActiveClassName = actived && !item.children ? "item-label-active" : "";

  const childActiveClassName = actived && item.children ? "item-child-active" : "";

  const iconActiveClassName = actived && item.children ? "label-arrow-active" : "";

  const shrinkClassName = shrinked ? "vertical-item-shrinked" : "";

  const handleOpen = () => (item.children ? setOpen(!open) : handleSelectMenu(item.id));

  return (
    <div style={itemStyle} className={`vertical-item ${shrinkClassName} ${childClassName} ${itemClassName}`}>
      <Tooltip
        placement="right"
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
        <div id={item.id} className={`item-child ${childActiveClassName}`}>
          {renderMenu(item.children, true)}
        </div>
      )}
    </div>
  );
};

export default MenuVerticalItem;
