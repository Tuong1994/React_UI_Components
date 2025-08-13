import { createContext } from "react";
import { ComponentColor } from "@/common/type";

export enum ETheme {
  DARK = "dark",
  LIGHT = "light",
}

export type LayoutTheme = ETheme.DARK | ETheme.LIGHT;

export type LayoutColor = Exclude<ComponentColor, "white" | "gray">;

export interface LayoutContextState {
  theme: LayoutTheme;
  color: LayoutColor;
  layouted: boolean;
}

const LayoutContext = createContext<LayoutContextState>({
  theme: ETheme.LIGHT,
  color: "blue",
  layouted: false,
});

export default LayoutContext;
