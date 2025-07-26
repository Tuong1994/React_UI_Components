import { ReactNode } from "react";
import { ComponentColor } from "@/common/type";

export type TabsType = "horizontal" | "vertical";

export type TabsColor = Exclude<ComponentColor, "black" | "white" | "gray">;

export type TabsItem = {
  id: string;
  title: ReactNode | ReactNode[];
  content: ReactNode | ReactNode[];
  icon?: ReactNode;
};

export type TabsItems = TabsItem[];
