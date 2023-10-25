import React from "react";

export interface SectionProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}

const Section: React.ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (
  { rootClassName = "", children, style },
  ref
) => {
  return (
    <section ref={ref} style={style} className={`section ${rootClassName}`}>
      {children}
    </section>
  );
};

export default React.forwardRef(Section);
