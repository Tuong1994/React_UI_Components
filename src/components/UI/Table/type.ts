import { ReactNode } from "react";
import { ComponentColor } from "@/common/type";

export type TableColor = Exclude<ComponentColor, "black" | "white" | "red" | "gray">;

type TableColumn<R = unknown> = {
  id: string;
  title: ReactNode | ReactNode[];
  dataIndex: keyof R;
  render?: (data: any, record: R, idx: number) => ReactNode | ReactNode[];
};

export type Columns<R = unknown> = TableColumn<R>[];
