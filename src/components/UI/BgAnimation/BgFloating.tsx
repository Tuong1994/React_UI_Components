import { CSSProperties, forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";
import { LayoutColor } from "../Layout/Context";
import { BgFloatingItemShape } from "./type";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

interface BgFoatingProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  count?: number;
  color?: LayoutColor;
  shape?: BgFloatingItemShape;
  fullScreen?: boolean;
}

const BgFloating: ForwardRefRenderFunction<HTMLDivElement, BgFoatingProps> = (
  { rootClassName = "", color = "blue", shape = "square", count = 80, fullScreen = true, ...restProps },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const bgColor = color ? color : layoutColor;

  const fixedClassName = fullScreen ? `bg-floating-fixed` : "";

  const colorClassName = `bg-floating-${bgColor}`;

  const className = utils.formatClassName("bg-floating", fixedClassName, colorClassName, rootClassName);

  const renderItems = () => {
    return [...Array(count)].map((_, idx) => {
      const size = Math.random() * 40 + 10; // 10px - 50px
      const duration = Math.random() * 15 + 10; // 10s - 25s

      const itemStyle: CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}vw`, // random horiztonal position
        animationDuration: `${duration}s`,
        animationDelay: `${Math.random() * 20}s`,
        borderRadius: shape === "square" ? (Math.random() > 0.7 ? "6px" : "3px") : "50%",
      };

      return <div key={idx} style={itemStyle} className="bg-floating-item"></div>;
    });
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      {renderItems()}
    </div>
  );
};

export default forwardRef(BgFloating);
