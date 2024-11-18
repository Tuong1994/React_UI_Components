import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { ComponentAligns, ComponentJustify } from "@/common/type";
import { FlexRowContext } from "./Context";
import utils from "@/utils";

export interface FlexRowProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  gutters?: [number?, number?];
  justify?: ComponentJustify;
  align?: ComponentAligns;
}

const FlexRow: ForwardRefRenderFunction<HTMLDivElement, FlexRowProps> = (
  { rootClassName = "", style, gutters = [], justify = "start", align = "top", children, ...restProps },
  ref
) => {
  const justifyClassName = `flex-row-${justify}`;

  const alignClassName = `flex-row-${align}`;

  const className = utils.formatClassName("flex-row", justifyClassName, alignClassName, rootClassName);

  const inlineStyle = () => {
    if (!gutters.length) return { ...style, gap: "10px" };
    if (gutters.length === 1) return { ...style, gap: `${gutters[0]}px` };
    if (gutters.length === 2) return { ...style, rowGap: `${gutters[0]}px`, columnGap: `${gutters[1]}px` };
  };

  return (
    <FlexRowContext.Provider value={{ gutters }}>
      <div ref={ref} style={inlineStyle()} {...restProps} className={className}>
        {children}
      </div>
    </FlexRowContext.Provider>
  );
};

export default forwardRef(FlexRow);
