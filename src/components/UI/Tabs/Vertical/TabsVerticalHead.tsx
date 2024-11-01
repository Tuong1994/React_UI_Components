import { FC } from "react";
import { TabsItem } from "../type";
import utils from "@/utils";

interface TabsVerticalHeadProps {
  item: TabsItem;
  tabActiveClassName: string;
  handleSelectTab: (id: string) => void;
}

const TabsVerticalHead: FC<TabsVerticalHeadProps> = ({ item, tabActiveClassName, handleSelectTab }) => {
  const className = utils.formatClassName("title-item", tabActiveClassName);

  return (
    <div className={className} onClick={() => handleSelectTab(item.id)}>
      <span className="item-icon">{item.icon}</span>
      <span>{item.title}</span>
    </div>
  );
};

export default TabsVerticalHead;
