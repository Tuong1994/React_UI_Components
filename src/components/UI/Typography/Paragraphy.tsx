import React from "react";

export interface ParagraphyProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  underline?: boolean;
  strong?: boolean;
  mark?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right" | "justify";
  variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

const Paragraphy: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphyProps> = (
  { rootClassName = "", style, children, underline, strong, mark, remove, italic, align = "left", variant = "default" },
  ref
) => {
  const variantClassName = `paragraphy-${variant}`;

  const alignClassName = `paragraphy-${align}`;

  const underlineClassName = underline ? "paragraphy-underline" : "";

  const strongClassName = strong ? "paragraphy-strong" : "";

  const removeClassName = remove ? "paragraphy-remove" : "";

  const italicClassName = italic ? "paragraphy-italic" : "";

  return (
    <p
      ref={ref}
      style={style}
      className={`paragraphy ${alignClassName} ${underlineClassName} ${strongClassName} ${removeClassName} ${italicClassName} ${variantClassName} ${rootClassName}`}
    >
      {mark ? <mark>{children}</mark> : children}
    </p>
  );
};

export default React.forwardRef(Paragraphy);
