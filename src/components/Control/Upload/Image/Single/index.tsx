import React from "react";
import { ACCEPT_FILE_TYPE, DEFAULT_FILE_SIZE } from "../../constant";
import { UploadError } from "@/components/Control/type";
import { NoteMessage } from "@/components/UI";
import Loading from "./Loading";
import Control from "./Control";
import Image from "@/components/UI/Image";

export interface SingleImageUploadProps {
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  shape?: "circle" | "square";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink";
  limit?: number;
  defaultImageUrl?: string;
  fileAccepted?: string;
  loading?: boolean;
  disabled?: boolean;
  onUpload?: (imageFile: File) => void;
}

const SingleImageUpload: React.ForwardRefRenderFunction<HTMLDivElement, SingleImageUploadProps> = (
  {
    rootClassName = "",
    rootStyle,
    shape = "square",
    color = "blue",
    defaultImageUrl = "",
    disabled,
    loading = false,
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = ACCEPT_FILE_TYPE.join(","),
    onUpload,
  },
  ref
) => {
  const [image, setImage] = React.useState<File | null>(null);

  const [viewImage, setViewImage] = React.useState<string>("");

  const [error, setError] = React.useState<UploadError | null>(null);

  const [dragged, setDragged] = React.useState<boolean>(false);

  const [uploading, setUploading] = React.useState<boolean>(loading);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const shapeClassName = `single-image-upload-${shape}`;

  const colorClassName = `single-image-upload-${color}`;
  
  const disabledClassName = disabled ? "upload-group-disabled" : "";

  const errorClassName = error?.active ? "upload-group-error" : "";

  const dragClassName = dragged ? "upload-group-dragged" : "";

  React.useEffect(() => {
    if(defaultImageUrl) setViewImage(defaultImageUrl);
  }, [defaultImageUrl]);

  React.useEffect(() => {
    if (!image) return;
    const reader = new FileReader();
    reader.onloadstart = () => setUploading(true);
    reader.onloadend = () => {
      setViewImage(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(image);
    setError(null);
  }, [image]);

  const errorMessage = () => {
    if (!error) return "";
    if (error.type === "fileSize") return `File size must not greater than ${limit / (1024 * 1024)}MB`;
    if (error.type === "fileType") {
      const types = fileAccepted.split(",").map((type) => type.replace("image/", ""));
      return `Only accept file type ${types.join(", ")}`;
    }
  };

  const handleUpload = (imageFile: File) => {
    if (!fileAccepted.includes(imageFile.type)) return setError({ active: true, type: "fileType" });
    if (imageFile.size > limit) return setError({ active: true, type: "fileSize" });
    setImage(imageFile);
    onUpload?.(imageFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;
    if (imageFile) handleUpload(imageFile);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageFile = e.dataTransfer.files[0];
      handleUpload(imageFile);
    }
  };

  const handleRemove = () => {
    if (image && inputRef.current && inputRef.current.files) {
      const fileTransfer = new DataTransfer();
      const uploadedImages: File[] = Array.from(inputRef.current.files);
      const filterImages: File[] = uploadedImages.filter((img) => img.name !== image.name);

      filterImages.forEach((file) => {
        const remainImage = new File([file.name], file.name);
        fileTransfer.items.add(remainImage);
      });

      inputRef.current.files = fileTransfer.files;
    }
    setViewImage("");
    setImage(null);
  };

  return (
    <div
      ref={ref}
      style={rootStyle}
      className={`single-image-upload ${shapeClassName} ${colorClassName} ${rootClassName}`}
    >
      <div
        className={`upload-group ${errorClassName} ${dragClassName} ${disabledClassName}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!uploading ? (
          viewImage ? (
            <Image src={viewImage} size="sm" hasView hasRemove onRemove={handleRemove} />
          ) : (
            <Control ref={inputRef} disabled={disabled} accept={fileAccepted} onChange={handleChange} />
          )
        ) : (
          <Loading />
        )}
      </div>

      {error && error.active && <NoteMessage type="error" message={errorMessage()} />}
    </div>
  );
};

export default React.forwardRef(SingleImageUpload);
