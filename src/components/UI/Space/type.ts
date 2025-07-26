import { ComponentAligns, ComponentJustify } from "@/common/type";

export type SpaceSize = "sm" | "md" | "lg" | number;

export type SpaceJustify = Exclude<ComponentJustify, "between" | "around" | "evenly">;

export type SpaceAligns = Exclude<ComponentAligns, "baseline">;
