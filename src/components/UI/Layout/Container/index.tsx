import React from "react";
import LayoutContext, { LayoutContextState } from "../Context";

export interface LayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  theme?: "dark" | "light";
}

const LayoutContainer: React.ForwardRefRenderFunction<HTMLDivElement, LayoutContainerProps> = (
  { rootClassName = "", theme = "dark", children, ...restProps },
  ref
) => {
  const initialValue: LayoutContextState = { theme, layouted: true };

  return (
    <LayoutContext.Provider value={initialValue}>
      <main {...restProps} ref={ref} className={`container ${rootClassName}`}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
};

export default React.forwardRef(LayoutContainer);
