import React from "react";
import TabsHead from "./Head";
import { TabsItems } from "./type";

export interface TabsProps {
  rootClassName?: string;
  headClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  items: TabsItems;
}

const Tabs: React.ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  { rootClassName = "", headClassName = "", contentClassName = "", style, headStyle, contentStyle, items = [] },
  ref
) => {
  const [tabActive, setTabActive] = React.useState<string>("1");

  const renderTitles = () => {
    const itemStyle: React.CSSProperties = { width: `calc(100% / ${items.length})` };

    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "head-item-active" : "";

      const commonProps = { item, itemStyle, tabActiveClassName, setTabActive };

      return <TabsHead key={item.id} {...commonProps} />;
    });
  };

  const renderContents = () => {
    return items.map((item) => {
      const tabActiveClassName = tabActive === item.id ? "content-item-active" : "";

      if (tabActive === item.id) {
        return (
          <div key={item.id} className={`content-item ${tabActiveClassName}`}>
            {item.content}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div ref={ref} style={style} className={`tabs ${rootClassName}`}>
      <div style={headStyle} className={`tabs-head ${headClassName}`}>
        {renderTitles()}
      </div>

      <div style={contentStyle} className={`tabs-content ${contentClassName}`}>
        {renderContents()}
      </div>
    </div>
  );
};

export default React.forwardRef(Tabs);
