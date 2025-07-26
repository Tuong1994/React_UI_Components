import { ComponentColor, ComponentShape } from "@/common/type";

export type AvatarColor = Exclude<ComponentColor, "white" | "gray">;

export type AvatarShape = Exclude<ComponentShape, "round">;
