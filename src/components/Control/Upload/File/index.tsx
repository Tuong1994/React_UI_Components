import React from "react";
import { UploadError, UploadImage, UploadImages } from "../../type";
import { ACCEPT_FILE_TYPE, DEFAULT_FILE_SIZE } from "../constant";
import { NoteMessage } from "@/components/UI";
import Control from "./Control";
import Items from "./Items";
import utils from "@/utils";

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink";
  limit?: number;
  fileAccepted?: string;
  onUpload?: (files: File[]) => void;
}

const FileUpload: React.ForwardRefRenderFunction<HTMLInputElement, FileUploadProps> = (
  {
    rootClassName = "",
    controlClassName = "",
    rootStyle,
    controlStyle,
    label,
    color = "blue",
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = "",
    onUpload,
    ...restProps
  },
  ref
) => {
  const [files, setFiles] = React.useState<UploadImages>([]);

  const [error, setError] = React.useState<UploadError | null>(null);

  const [dragged, setDragged] = React.useState<boolean>(false);

  const colorClassName = `file-upload-${color}`;

  React.useEffect(() => {
    onUpload?.(files.map((uploadFile) => uploadFile.file as File));
  }, [files.length]);

  const errorMessage = () => {
    if (!error) return "";
    if (error.type === "fileSize") return `File size must not greater than ${limit / (1024 * 1024)}MB`;
    if (error.type === "fileType") return `Only accept file type ${fileAccepted}}`;
  };

  const handleUpload = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (fileAccepted && !fileAccepted.includes(file.type))
        return setError({ type: "fileType", active: true });
      if (file.size > limit) return setError({ type: "fileSize", active: true });
    }

    const uploadFiles: UploadImages = files.map((file) => ({ id: utils.uuid(), file }));
    if (!files.length) setFiles(uploadFiles);
    else setFiles((prev) => [...prev, ...uploadFiles]);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    handleUpload(files);
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files) {
      const uploadFiles: File[] = Array.from(e.dataTransfer.files);
      handleUpload(uploadFiles);
    }
  };

  const handleRemove = (uploadFile: UploadImage) => {
    const inputEl = document.getElementById("fileUpload") as HTMLInputElement;
    if (files && inputEl && inputEl.files) {
      const dataTransfer = new DataTransfer();
      const uploadFiles: File[] = Array.from(inputEl.files);
      const filterFiles: File[] = uploadFiles.filter((f) => f.name !== uploadFile.file?.name);

      filterFiles.forEach((file) => {
        const remainFile = new File([file.name], file.name);
        dataTransfer.items.add(remainFile);
      });
      inputEl.files = dataTransfer.files;
    }
    setFiles((prev) => [...prev].filter((file) => file.id !== uploadFile.id));
  };

  return (
    <div style={rootStyle} className={`file-upload ${colorClassName} ${rootClassName}`}>
      <Control
        {...restProps}
        ref={ref}
        id="fileUpload"
        controlClassName={controlClassName}
        controlStyle={controlStyle}
        error={error}
        dragged={dragged}
        label={label}
        accept={fileAccepted ?? ACCEPT_FILE_TYPE.join(",")}
        onChange={handleChange}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />

      {error?.active && <NoteMessage type="error" message={errorMessage()} />}

      <Items files={files} handleRemove={handleRemove} />
    </div>
  );
};

export default React.forwardRef(FileUpload);
