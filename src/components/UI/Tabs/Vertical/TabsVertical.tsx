import { CSSProperties, ForwardRefRenderFunction, HTMLAttributes, forwardRef, useRef, useState } from "react";
import { TabsColor, TabsItems } from "../type";
import TabsVerticalHead from "./TabsVerticalHead";
import useLayout from "../../Layout/useLayout";
import utils from "@/utils";

interface TabsVerticalProps extends HTMLAttributes<HTMLDivElement> {
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

const TabsVertical: ForwardRefRenderFunction<HTMLDivElement, TabsVerticalProps> = (
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

  const contentRef = useRef<HTMLDivElement | null>(null);

  const colorClassName = `tabs-vertical-${color}`;

  const themeClassName = `tabs-vertical-${theme}`;

  const mainClassName = utils.formatClassName("tabs-vertical", colorClassName, themeClassName, rootClassName);

  const tabsTitleClassName = utils.formatClassName("tabs-vertical-title", headClassName);

  const tabsContentClassName = utils.formatClassName("tabs-vertical-content", contentClassName);

  const handleSelectTab = (id: string) => {
    setTabActive(id);
    onSelectTab?.(id);
  };

  const getDividerHeight = () => {
    if (!contentRef.current) return;
    return { height: `${contentRef.current.scrollHeight}px` };
  };

  const renderTitles = () => {
    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "title-item-active" : "";
      const commonProps = { item, tabActiveClassName, handleSelectTab };
      return <TabsVerticalHead key={item.id} {...commonProps} />;
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
      <div style={headStyle} className={tabsTitleClassName}>
        {renderTitles()}
      </div>
      <div style={getDividerHeight()} className="tabs-vertical-divider" />
      <div ref={contentRef} style={contentStyle} className={tabsContentClassName}>
        {renderContents()}
      </div>
    </div>
  );
};

export default forwardRef(TabsVertical);
