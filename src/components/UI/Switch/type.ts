import { ComponentColor, ComponentSize } from "@/common/type";

export type SwitchColor = Exclude<ComponentColor, "black" | "white" | "gray">;

export type SwitchSize = ComponentSize;
