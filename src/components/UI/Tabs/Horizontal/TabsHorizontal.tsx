import { HTMLAttributes, CSSProperties, ForwardRefRenderFunction, useState, forwardRef } from "react";
import { TabsColor, TabsItems } from "../type";
import TabsHorizontalHead from "./TabsHozitontalHead";
import useLayout from "../../Layout/useLayout";
import utils from "@/utils";

export interface TabsHorizontalProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  style?: CSSProperties;
  headStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  defaultActiveId?: string;
  items: TabsItems;
  color?: TabsColor;
  onSelectTab?: (id: string) => void;
}

const TabsHorizontal: ForwardRefRenderFunction<HTMLDivElement, TabsHorizontalProps> = (
  {
    rootClassName = "",
    headClassName = "",
    contentClassName = "",
    style,
    headStyle,
    contentStyle,
    color = "blue",
    items = [],
    defaultActiveId,
    onSelectTab,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [tabActive, setTabActive] = useState<string>(defaultActiveId ?? items[0]?.id);

  const colorClassName = `tabs-horizontal-${color}`;

  const themeClassName = `tabs-horizontal-${theme}`;

  const mainClassName = utils.formatClassName(
    "tabs-horizontal",
    colorClassName,
    themeClassName,
    rootClassName
  );

  const tabsHeadClassName = utils.formatClassName("tabs-horizontal-head", headClassName);

  const tabsContentClassName = utils.formatClassName("tabs-horizontal-content", contentClassName);

  const handleSelectTab = (id: string) => {
    setTabActive(id);
    onSelectTab?.(id);
  };

  const renderTitles = () => {
    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "head-item-active" : "";
      const commonProps = { item, tabActiveClassName, handleSelectTab };
      return <TabsHorizontalHead key={item.id} {...commonProps} />;
    });
  };

  const renderContents = () => {
    return items.map((item) => {
      const actived = tabActive === item.id;
      const tabActiveClassName = actived ? "content-item-active" : "";
      if (actived) {
        return (
          <div key={item.id} className={utils.formatClassName("content-item", tabActiveClassName)}>
            {item.content}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div ref={ref} style={style} {...restProps} className={mainClassName}>
      <div style={headStyle} className={tabsHeadClassName}>
        {renderTitles()}
      </div>
      <div style={contentStyle} className={tabsContentClassName}>
        {renderContents()}
      </div>
    </div>
  );
};

export default forwardRef(TabsHorizontal);
