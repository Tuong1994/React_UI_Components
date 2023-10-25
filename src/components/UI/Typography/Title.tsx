import React from "react";

export interface TitleProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  underline?: boolean;
  remove?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right" | "justify";
  variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

const Title: React.ForwardRefRenderFunction<HTMLHeadingElement, TitleProps> = (
  { level = 1, children, underline, remove, italic, align = "left", variant = "default" },
  ref
) => {
  const variantClassName = `title-${variant}`;

  const alignClassName = `title-${align}`;

  const underlineClassName = underline ? "title-underline" : "";

  const removeClassName = remove ? "title-remove" : "";

  const italicClassName = italic ? "title-italic" : "";

  const commonProps = {
    ref,
    className: `title title-${level} ${alignClassName} ${removeClassName} ${italicClassName} ${underlineClassName} ${variantClassName}`,
  };

  return (
    <React.Fragment>
      {level === 1 && <h1 {...commonProps}>{children}</h1>}
      {level === 2 && <h2 {...commonProps}>{children}</h2>}
      {level === 3 && <h3 {...commonProps}>{children}</h3>}
      {level === 4 && <h4 {...commonProps}>{children}</h4>}
      {level === 5 && <h5 {...commonProps}>{children}</h5>}
      {level === 6 && <h6 {...commonProps}>{children}</h6>}
    </React.Fragment>
  );
};

export default React.forwardRef(Title);
