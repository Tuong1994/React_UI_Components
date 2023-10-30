import React from "react";
import { MenuItems } from "../type";
import LayoutContext from "../../Context";
import MenuVerticalItem from "./Item";

export interface MenuVerticalProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
}

const MenuVertical: React.ForwardRefRenderFunction<HTMLDivElement, MenuVerticalProps> = (
  { rootClassName = "", style, items = [], ...restProps },
  ref
) => {
  const { theme } = React.useContext(LayoutContext);

  const [activeId, setActiveId] = React.useState<string[]>([]);

  const themeClassName = theme === "dark" ? "menu-vertical-dark" : "";

  const handleSelectMenu = (id: string) => {
    if (activeId.length) setActiveId([]);
    setActiveId([id]);
  };

  const renderMenu = (list?: MenuItems, childed?: boolean) => {
    if (!list) return;
    if (!list.length) return;

    return list.map((item) => {
      const hasChild = item.children && item.children.length > 0;

      const childClassName = childed ? "vertical-item-child" : "";

      return (
        <MenuVerticalItem
          {...restProps}
          key={item.id}
          childed={childed as boolean}
          item={item}
          activeId={activeId}
          hasChild={hasChild}
          childClassName={childClassName}
          renderMenu={renderMenu}
          handleSelectMenu={handleSelectMenu}
        />
      );
    });
  };

  return (
    <div ref={ref} style={style} className={`menu-vertical ${themeClassName} ${rootClassName}`}>
      {renderMenu(items)}
    </div>
  );
};

export default React.forwardRef(MenuVertical);
