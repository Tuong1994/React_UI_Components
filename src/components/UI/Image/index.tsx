import React from "react";
import { ComponentSize } from "@/common/type";
import ImageView from "./View";
import ImageLoading from "./Loading";
import DefaultImage from "@/assets/default-image.jpg";

type ImageSize = ComponentSize | number | any;

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  size?: ImageSize;
  objectFit?: "fill" | "cover" | "contain" | "none";
  hasView?: boolean;
  hasRemove?: boolean;
  onRemove?: () => void;
}

const Image: React.ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
  { rootClassName = "", rootStyle, size = "sm", objectFit = "fill", src = DefaultImage, ...restProps },
  ref
) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const [view, setView] = React.useState<string>("");

  const elRef = React.useRef<HTMLDivElement>(null);

  const fitClassName = `image-${objectFit}`;

  React.useEffect(() => {
    if (window["IntersectionObserver"]) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setView(src);
          if (elRef.current && elRef.current !== null) observer.unobserve(elRef.current);
        }
      });
      if (elRef.current && elRef.current !== null) observer.observe(elRef.current);
    } else setView(src);
  }, [src]);

  const imageSize = (): React.CSSProperties => {
    if (typeof size === "number") return { width: `${size}px`, height: `${size}px` };
    if (size === "sm") return { width: `100px`, height: `100px` };
    if (size === "md") return { width: `200px`, height: `200px` };
    if (size === "lg") return { width: `300px`, height: `300px` };
    return { width: size, height: size };
  };

  const handleImageLoaded = () => setLoading(false);

  return (
    <div style={{ ...rootStyle, ...imageSize() }} className={`image ${fitClassName} ${rootClassName}`}>
      {loading && !view ? (
        <ImageLoading ref={elRef} imageSize={imageSize} />
      ) : (
        <ImageView ref={ref} {...restProps} src={view} imageSize={imageSize} onLoad={handleImageLoaded} />
      )}
    </div>
  );
};

export default React.forwardRef(Image);
