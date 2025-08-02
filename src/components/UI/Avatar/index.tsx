import {
  HTMLAttributes,
  ReactNode,
  ForwardRefRenderFunction,
  useState,
  useEffect,
  forwardRef,
  CSSProperties,
} from "react";
import { HiUser } from "react-icons/hi2";
import { AvatarColor, AvatarShape } from "./type";
import utils from "@/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  size?: number;
  letter?: string;
  badge?: string;
  dot?: boolean;
  color?: AvatarColor;
  shape?: AvatarShape;
}

const Avatar: ForwardRefRenderFunction<HTMLDivElement, AvatarProps> = (
  {
    rootClassName = "",
    style,
    children,
    size = 30,
    shape = "circle",
    color = "blue",
    dot,
    badge,
    letter,
    ...restProps
  },
  ref
) => {
  const [iconSize, setIconSize] = useState<number>(18);

  const shapeClassName = `avatar-${shape}`;

  const colorClassName = !children ? `avatar-${color}` : "";

  const letterClassName = letter ? "avatar-letter" : "";

  const badgeRadiusClassName = badge && badge.length > 1 ? "avatar-badge-radius" : "";

  const inlineStyle: CSSProperties = { ...style, width: `${size}px`, height: `${size}px` };

  const contentStyle: CSSProperties = { fontSize: `${size - 10}px` };

  const mainClassName = utils.formatClassName("avatar", colorClassName, shapeClassName, letterClassName, rootClassName);

  const badgeClassName = utils.formatClassName("avatar-badge", badgeRadiusClassName);

  useEffect(() => {
    setIconSize(18);
    if (size < 30 && size % 10 === 0) setIconSize((prev) => prev - 6);
    if (size > 30 && size % 10 === 0) setIconSize((prev) => prev + 16);
  }, [size]);

  const renderContent = () => {
    if (children) return children;
    if (letter) return letter.slice(0, 1);
    return <HiUser size={iconSize} />;
  };

  return (
    <div ref={ref} {...restProps} style={inlineStyle} className={mainClassName}>
      {badge && <div className={badgeClassName}>{badge}</div>}

      {dot && <div className="avatar-dot" />}

      <div style={contentStyle} className="avatar-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default forwardRef(Avatar);
