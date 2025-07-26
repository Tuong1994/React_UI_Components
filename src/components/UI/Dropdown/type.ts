import { ReactNode } from "react";
import { ComponentPlacement } from "@/common/type";

export type DropdownItem = {
  id: string;
  label: ReactNode | ReactNode[];
};

export type DropdownItems = DropdownItem[];

export type DropdownTriggerType = "click" | "hover";

export type DropdownPlacement = Exclude<ComponentPlacement, "top" | "bottom">;
