import { ComponentColor, ComponentShape } from "@/common/type";

export type BadgeColor = Exclude<ComponentColor, "white" | "gray">;

export type BadgeShape = Exclude<ComponentShape, "circle">;
