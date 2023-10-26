import React from "react";
import { HiPlus } from "react-icons/hi2";

interface SingleImageUploadControlProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SingleImageUploadControl: React.ForwardRefRenderFunction<
  HTMLInputElement,
  SingleImageUploadControlProps
> = ({ ...restProps }, ref) => {
  return (
    <label className="group-control">
      <input ref={ref} {...restProps} type="file" className="control-input" />
      <HiPlus size={25} className="control-icon" />
    </label>
  );
};

export default React.forwardRef(SingleImageUploadControl);
