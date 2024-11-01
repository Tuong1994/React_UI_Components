import { FC } from "react";
import { TabsItem } from "../type";
import utils from "@/utils";

interface TabsHorizontalHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  handleSelectTab: (id: string) => void;
}

const TabsHorizontalHead: FC<TabsHorizontalHeadProps> = ({ item, tabActiveClassName, handleSelectTab }) => {
  const className = utils.formatClassName("head-item", tabActiveClassName);

  return (
    <div className={className} onClick={() => handleSelectTab(item.id)}>
      <div className="item-inner">
        <span className="inner-icon">{item.icon}</span>
        <span>{item.title}</span>
      </div>
    </div>
  );
};

export default TabsHorizontalHead;
