import React from "react";
import { MenuItems } from "../type";
import LayoutContext from "../../Context";
import MenuHorizontalItem from "./Item";

export interface MenuHorizontalProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
}

const MenuHorizontal: React.ForwardRefRenderFunction<HTMLDivElement, MenuHorizontalProps> = (
  { rootClassName = "", style, items = [], ...restProps },
  ref
) => {
  const { layouted } = React.useContext(LayoutContext);

  const [activeId, setActiveId] = React.useState<string[]>([]);

  const layoutClassName = layouted ? "menu-horizontal-layout" : "";

  const handleOpenMenu = (id: string) => {
    const idx = activeId.indexOf(id);
    if (idx === -1) setActiveId((prev) => [...prev, id]);
    else setActiveId((prev) => [...prev].filter((active) => active !== id));
  };

  const renderMenu = (list?: MenuItems, childed?: boolean) => {
    if (!list) return;
    if (!list.length) return;

    const childClassName = childed ? "horizontal-item-child" : "";

    return list.map((item) => {
      const hasChild = item.children && item.children.length > 0;

      return (
        <MenuHorizontalItem
          {...restProps}
          key={item.id}
          activeId={activeId}
          hasChild={hasChild}
          childed={childed}
          item={item}
          childClassName={childClassName}
          renderMenu={renderMenu}
          handleOpenMenu={handleOpenMenu}
        />
      );
    });
  };

  return (
    <div ref={ref} style={style} className={`menu-horizontal ${layoutClassName} ${rootClassName}`}>
      {renderMenu(items)}
    </div>
  );
};

export default React.forwardRef(MenuHorizontal);
