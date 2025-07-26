import { ComponentColor, ComponentSize } from "@/common/type";
import { ControlShape } from "@/components/Control/type";

export type ButtonColor = Exclude<ComponentColor, "white" | "gray">;

export type ButtonShape = ControlShape;

export type ButtonSize = ComponentSize;
