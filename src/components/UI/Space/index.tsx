import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { SpaceAligns, SpaceJustify, SpaceSize } from "./type";
import utils from "@/utils";

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  size?: SpaceSize;
  justify?: SpaceJustify;
  aligns?: SpaceAligns;
}

const Space: ForwardRefRenderFunction<HTMLDivElement, SpaceProps> = (
  { rootClassName = "", style, children, size = "sm", justify = "left", aligns = "top", ...restProps },
  ref
) => {
  const justifyClassName = `space-${justify}`;

  const alignClassName = `space-${aligns}`;

  const className = utils.formatClassName("space", justifyClassName, alignClassName, rootClassName);

  const rootStyle = () => {
    if (typeof size === "number") return { ...style, gap: `10px ${size}px` };
    if (size === "sm") return { ...style, gap: "10px" };
    if (size === "md") return { ...style, gap: "10px 30px" };
    if (size === "lg") return { ...style, gap: "10px 60px" };
  };

  return (
    <div ref={ref} style={rootStyle()} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(Space);
