import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  DragEvent,
  useState,
  useEffect,
  useContext,
  forwardRef,
} from "react";
import { ControlColor, ControlShape, UploadError, UploadItem, UploadItems } from "../../type";
import { ACCEPT_FILE_TYPE, DEFAULT_FILE_SIZE } from "../constant";
import { NoteMessage } from "@/components/UI";
import FormContext from "../../Form/FormContext";
import Control from "./Control";
import Items from "./Items";
import utils from "@/utils";
import useLayout from "@/components/UI/Layout/useLayout";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  controlClassName?: string;
  rootStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  color?: ControlColor;
  shape?: ControlShape;
  limit?: number;
  fileAccepted?: string;
  onUpload?: (files: File[]) => void;
}

const FileUpload: ForwardRefRenderFunction<HTMLInputElement, FileUploadProps> = (
  {
    rootClassName = "",
    controlClassName = "",
    rootStyle,
    controlStyle,
    label,
    color = "blue",
    shape = "square",
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = "",
    onUpload,
    ...restProps
  },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { isForm, color: rhfColor, shape: rhfShape } = useContext(FormContext);

  const [files, setFiles] = useState<UploadItems>([]);

  const [error, setError] = useState<UploadError | null>(null);

  const [dragged, setDragged] = useState<boolean>(false);

  const controlColor = isForm ? rhfColor : color;

  const controlShape = isForm ? rhfShape : shape;

  const colorClassName = `file-upload-${controlColor}`;

  const shapeClassName = `file-upload-${controlShape}`;

  const gapClassName = isForm ? "file-upload-gap" : "";

  const themeClassName = `file-upload-${theme}`;

  const mainClassName = utils.formatClassName(
    "file-upload",
    colorClassName,
    gapClassName,
    shapeClassName,
    themeClassName,
    rootClassName
  );

  useEffect(() => {
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

    const uploadFiles: UploadItems = files.map((file) => ({ id: utils.uuid(), file }));
    if (!files.length) setFiles(uploadFiles);
    else setFiles((prev) => [...prev, ...uploadFiles]);
    setError(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    handleUpload(files);
  };

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files) {
      const uploadFiles: File[] = Array.from(e.dataTransfer.files);
      handleUpload(uploadFiles);
    }
  };

  const handleRemove = (uploadFile: UploadItem) => {
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
    <div style={rootStyle} className={mainClassName}>
      <Control
        ref={ref}
        {...restProps}
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

export default forwardRef(FileUpload);
