import React from "react";

interface FormFooterProps {
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}

const FormFooter: React.ForwardRefRenderFunction<HTMLDivElement, FormFooterProps> = (
  { rootClassName = "", style, children },
  ref
) => {
  return (
    <div ref={ref} style={style} className={`form-footer ${rootClassName}`}>
      {children}
    </div>
  );
};

export default React.forwardRef(FormFooter);
