import { ForwardRefRenderFunction, HTMLAttributes, ReactNode, MouseEvent, forwardRef } from "react";
import { AnchorColor } from "./type";
import { smoothScroll } from "./smoothScroll";
import useAnchor from "./useAnchor";
import utils from "@/utils";

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  rootClassName?: string;
  linkColor?: AnchorColor;
  children?: ReactNode;
}

const Anchor: ForwardRefRenderFunction<HTMLAnchorElement, AnchorProps> = (
  { rootClassName = "", children, id, linkColor = "blue", onClick, ...restProps },
  ref
) => {
  const colorClassName = `anchor-${linkColor}`;

  const className = utils.formatClassName("anchor", colorClassName, rootClassName);

  useAnchor();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    smoothScroll(e);
  };

  return (
    <a ref={ref} {...restProps} href={`#${id}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default forwardRef(Anchor);
