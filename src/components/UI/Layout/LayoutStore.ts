import { StateCreator, create } from "zustand";
import { ETheme, LayoutColor, LayoutTheme } from "./Context";

interface LayoutState {
  layoutTheme: LayoutTheme;
  layoutColor: LayoutColor;
  shrinked: boolean;
  show: boolean;
  resizeContent: boolean;
  onShrinked: () => void;
  onResizeContent: () => void;
  onShowSide: () => void;
  onHideSide: () => void;
  onSwitchTheme: (theme: LayoutTheme) => void;
  onSwitchColor: (color: LayoutColor) => void;
}

const store: StateCreator<LayoutState> = (set) => ({
  layoutTheme: ETheme.LIGHT,
  layoutColor: "blue",
  shrinked: false,
  show: false,
  resizeContent: false,
  onShrinked: () => set((state) => ({ ...state, shrinked: !state.shrinked })),
  onResizeContent: () => set((state) => ({ ...state, resizeContent: true })),
  onShowSide: () => set((state) => ({ ...state, show: true })),
  onHideSide: () => set((state) => ({ ...state, show: false })),
  onSwitchTheme: (theme: LayoutTheme) => set((state) => ({ ...state, layoutTheme: theme })),
  onSwitchColor: (color: LayoutColor) => set((state) => ({ ...state, layoutColor: color })),
});

const useLayoutStore = create(store);

export default useLayoutStore;
