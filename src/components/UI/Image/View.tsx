import React from "react";
import { ImageProps } from ".";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ImageViewPopup from "./ViewPopup";

type ViewImage = {
  url: string;
  open: boolean;
};

interface ImageViewProps extends ImageProps {
  imageSize: () => React.CSSProperties;
}

const ImageView: React.ForwardRefRenderFunction<HTMLImageElement, ImageViewProps> = (
  { imageSize, src = "", hasView, hasRemove, onRemove, ...restProps },
  ref
) => {
  const [popup, setPopup] = React.useState<ViewImage>({ url: "", open: false });

  return (
    <div style={imageSize()} className="image-group">
      <img ref={ref} {...restProps} src={src} className="group-view" />

      {hasView && (
        <div className="group-actions">
          <AiOutlineEye
            size={20}
            className="actions-icon"
            onClick={() => setPopup({ ...popup, url: src, open: true })}
          />
          {hasRemove && <BsTrash size={20} className="actions-icon" onClick={onRemove} />}
        </div>
      )}

      <ImageViewPopup open={popup.open} url={popup.url} onClose={() => setPopup({ ...popup, open: false })} />
    </div>
  );
};

export default React.forwardRef(ImageView);
