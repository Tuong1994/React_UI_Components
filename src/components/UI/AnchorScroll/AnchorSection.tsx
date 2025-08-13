import { ForwardRefRenderFunction, HTMLAttributes, ReactNode, forwardRef } from "react";
import utils from "@/utils";

export interface AnchorSectionProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode;
}

const AnchorSection: ForwardRefRenderFunction<HTMLDivElement, AnchorSectionProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const className = utils.formatClassName("anchor-section", rootClassName);

  return (
    <div ref={ref} {...restProps} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(AnchorSection);
