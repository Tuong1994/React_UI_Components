import { ReactNode } from "react";

export type TabsType = 'horizontal' | 'vertical'

export type TabsItem = {
  id: string;
  title: ReactNode | ReactNode[];
  content: ReactNode | ReactNode[];
  icon?: ReactNode;
};

export type TabsItems = TabsItem[];
