import {
  CSSProperties,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { GridCols } from "./type";
import { useViewpoint } from "@/hooks";
import utils from "@/utils";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  rootStyle?: CSSProperties;
  xs?: GridCols;
  md?: GridCols;
  lg?: GridCols;
  span?: GridCols;
  gap?: [number?, number?];
  children?: ReactNode;
}

const Grid: ForwardRefRenderFunction<HTMLDivElement, GridProps> = (
  { rootClassName = "", rootStyle, xs = 0, md = 0, lg = 0, span = 0, gap = [10], children, ...restProps },
  ref
) => {
  const { isPhone, isTablet, isLaptop, isDesktop } = useViewpoint();

  const [cols, setCols] = useState<GridCols>(span);

  const mainClassName = utils.formatClassName("grid", rootClassName);

  const gridColumns = () => {
    if (cols === 0) return "auto";
    return `repeat(${cols}, 1fr)`;
  };

  const gridRowGap = () => `${gap[0]}px`;

  const gridColGap = () => `${!gap[1] ? 10 : gap[1]}px`;

  const gridStyle: CSSProperties = {
    ...rootStyle,
    gridTemplateColumns: gridColumns(),
    gridRowGap: gridRowGap(),
    gridColumnGap: gridColGap(),
  };

  useEffect(() => {
    if (isDesktop) return setCols(span);

    if (isPhone) return setCols(xs);

    if (isTablet) return setCols(md);

    if (isLaptop) return setCols(lg);

    if (xs === 0 || md === 0 || lg === 0) setCols(0);
  }, [xs, md, lg, span, isPhone, isTablet, isLaptop, isDesktop]);

  return (
    <div ref={ref} {...restProps} style={gridStyle} className={mainClassName}>
      {children}
    </div>
  );
};

export default forwardRef(Grid);
