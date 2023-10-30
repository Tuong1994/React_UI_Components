import React from "react";
import LayoutContext from "../Context";
import { CgArrowsShrinkH as ShrinkIcon } from "react-icons/cg";
import useLayoutStore from "../LayoutStore";

export interface LayoutSideProps extends React.HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LayoutSide: React.ForwardRefRenderFunction<HTMLDivElement, LayoutSideProps> = (
  { rootClassName = "", children, ...restProps },
  ref
) => {
  const { theme, layouted } = React.useContext(LayoutContext);

  const [shrinked, onShrinked] = useLayoutStore((state) => [state.shrinked, state.onShrinked]);

  const themeClassName = `side-${theme}`;

  const shrinkClassName = shrinked ? `side-shrinked` : "";

  const layoutClassName = layouted ? "side-layout" : "";

  return (
    <aside
      {...restProps}
      ref={ref}
      className={`side ${shrinkClassName} ${layoutClassName} ${themeClassName} ${rootClassName}`}
    >
      <div className="side-content">{children}</div>
      <div className="side-action">
        <button className="action-btn" onClick={onShrinked}>
          <ShrinkIcon size={25} />
        </button>
      </div>
    </aside>
  );
};

export default React.forwardRef(LayoutSide);
