import React from "react";

export interface LayoutContextState {
  theme: "dark" | "light";
  layouted: boolean;
}

const LayoutContext = React.createContext<LayoutContextState>({ theme: "light", layouted: false });

export default LayoutContext;
