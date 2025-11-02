import {
  CSSProperties,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape } from "../type";
import { useFormContext } from "react-hook-form";
import { useLang } from "@/hooks";
import FormContext from "../Form/FormContext";
import ReactQuill, { ReactQuillProps } from "react-quill";
import FormItemContext from "../Form/FormItemContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";
import "react-quill/dist/quill.snow.css";

interface EditorProps extends ReactQuillProps {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  content?: string;
  disabled?: boolean;
  label?: ReactNode;
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  onChangeEditor?: (value: string) => void;
}

const Editor: ForwardRefRenderFunction<HTMLDivElement, EditorProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    inputStyle,
    content = "",
    sizes = "md",
    color = "blue",
    shape = "square",
    label,
    disabled,
    required,
    optional,
    modules,
    onChangeEditor,
    ...restProps
  },
  ref
) => {
  const { lang } = useLang();

  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = useContext(FormContext);

  const { isRhf, rhfName, rhfValue, rhfDisabled } = useContext(FormItemContext);

  const { layoutTheme: theme } = layoutValue;

  const [value, setValue] = useState<string>(content);

  const [touched, setTouched] = useState<boolean>(false);

  const defaultModules = useMemo<ReactQuillProps["modules"]>(
    () =>
      modules
        ? modules
        : {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6] }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              [{ align: [] }],
              ["link"],
              ["clean"],
            ],
          },
    [modules]
  );

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showOptional = required ? false : optional;

  const themeClassName = `editor-${theme}`;

  const sizeClassName = `editor-${controlSize}`;

  const colorClassName = `editor-${controlColor}`;

  const shapeClassName = `editor-${controlShape}`;

  const controlLabelClassName = utils.formatClassName("editor-label", labelClassName);

  const controlInputClassName = utils.formatClassName("editor-control", inputClassName);

  const mainClassName = utils.formatClassName(
    "editor",
    sizeClassName,
    colorClassName,
    shapeClassName,
    themeClassName,
    rootClassName
  );

  const triggerValidation = useCallback(() => {
    if (touched && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && rhfValue) rhfMethods.trigger(rhfName);
  }, [touched, rhfMethods, rhfName, rhfValue]);

  // Trigger validation
  useEffect(() => {
    if (!isRhf) return;
    triggerValidation();
  }, [isRhf, triggerValidation]);

  // Set default value
  useEffect(() => {
    if (isRhf) return setValue(rhfValue);
    setValue(content);
  }, [content, isRhf, rhfValue]);

  const handleFocus = () => setTouched(true);

  const handleBlur = () => setTouched(false);

  const handleChange = (value: string, editor: ReactQuill.UnprivilegedEditor) => {
    let content = "";
    const text = editor.getText().trim()
    if(text !== "") content = value
    setValue(content);
    if (isRhf) rhfMethods.setValue(rhfName, content);
    onChangeEditor?.(content);
  };

  return (
    <div ref={ref} className={mainClassName}>
      <label>
        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
          </div>
        )}

        <ReactQuill
          {...restProps}
          theme="snow"
          className={controlInputClassName}
          value={value}
          modules={defaultModules}
          readOnly={controlDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(value, delta, source, editor) => handleChange(value, editor)}
        />
      </label>
    </div>
  );
};

export default forwardRef(Editor);
