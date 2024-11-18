import { ReactNode } from "react";
import { useViewpoint } from "@/hooks";
import { FlexAppContext } from "./Context";

const FlexProvider = ({ children }: { children: ReactNode }) => {
  const { isPhone, isTablet, isLaptop, isDesktop, screenWidth } = useViewpoint();
  return (
    <FlexAppContext.Provider value={{ isPhone, isTablet, isLaptop, isDesktop, screenWidth }}>
      {children}
    </FlexAppContext.Provider>
  );
};

export default FlexProvider;
