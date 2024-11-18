import { createContext } from "react";

export interface FlexAppContextState {
  screenWidth?: number;
  isPhone?: boolean;
  isTablet?: boolean;
  isLaptop?: boolean;
  isDesktop?: boolean;
}

export interface FlexRowContextState {
  gutters: [number?, number?];
}

export const FlexAppContext = createContext<FlexAppContextState>({
  screenWidth: 0,
  isPhone: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
});

export const FlexRowContext = createContext<FlexRowContextState>({
  gutters: [],
});
