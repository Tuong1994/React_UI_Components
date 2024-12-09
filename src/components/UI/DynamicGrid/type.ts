import { ReactNode } from "react";

export type DynamicGridItem = {
  id: string;
  node: ReactNode;
};

export type DynamicGridItems = DynamicGridItem[];
