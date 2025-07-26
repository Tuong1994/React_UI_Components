import { ComponentColor, ComponentPlacement } from "@/common/type";

export type TooltipColor = Exclude<ComponentColor, "white" | "gray">;

export type TooltipPlacement = ComponentPlacement;
