import React from "react";
import { TypographyAlign, TypographyVariant } from "./type";

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  weight?: number;
  size?: number;
  lineHeight?: number;
  underline?: boolean;
  strong?: boolean;
  mark?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: TypographyAlign;
  variant?: TypographyVariant;
}

const Paragraph: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps> = (
  {
    rootClassName = "",
    children,
    underline,
    strong,
    mark,
    remove,
    italic,
    size = 14,
    weight = 400,
    lineHeight = 25,
    align = "left",
    variant = "default",
    style,
    ...restProps
  },
  ref
) => {
  const variantClassName = `paragraph-${variant}`;

  const alignClassName = `paragraph-${align}`;

  const underlineClassName = underline ? "paragraph-underline" : "";

  const strongClassName = strong ? "paragraph-strong" : "";

  const removeClassName = remove ? "paragraph-remove" : "";

  const italicClassName = italic ? "paragraph-italic" : "";

  const inlineStyle = (): React.CSSProperties => {
    const defaultStyle = { ...style, fontSize: `${size}px`, lineHeight: `${lineHeight}px` };
    if (strong) return defaultStyle;
    return { ...defaultStyle, fontWeight: weight };
  };

  return (
    <p
      {...restProps}
      ref={ref}
      style={inlineStyle()}
      className={`paragraph ${alignClassName} ${underlineClassName} ${strongClassName} ${removeClassName} ${italicClassName} ${variantClassName} ${rootClassName}`}
    >
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default React.forwardRef(Paragraph);
