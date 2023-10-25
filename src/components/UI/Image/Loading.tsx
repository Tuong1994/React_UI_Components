import React from "react";
import { FaSpinner } from "react-icons/fa";

interface ImageLoadingProps {
  imageSize: () => React.CSSProperties;
}

const ImageLoading: React.ForwardRefRenderFunction<HTMLDivElement, ImageLoadingProps> = ({ imageSize }, ref) => {
  return (
    <div ref={ref} style={imageSize()} className="image-loading">
      <FaSpinner size={20} />
    </div>
  );
};

export default React.forwardRef(ImageLoading);
