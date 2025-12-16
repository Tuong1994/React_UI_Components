import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  ChangeEvent,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { HiCheck } from "react-icons/hi2";
import { ChoicesControlColor, InputValue } from "../type";
import { ComponentSize } from "@/common/type";
import { useFormContext } from "react-hook-form";
import { useLang } from "@/hooks";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  controlClassName?: string;
  rootStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  label?: ReactNode | ReactNode[];
  sizes?: ComponentSize;
  color?: ChoicesControlColor;
  required?: boolean;
  optional?: boolean;
  onCheck?: (checked: boolean, value: InputValue) => void;
}

const CheckBox: ForwardRefRenderFunction<HTMLInputElement, CheckBoxProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    controlClassName = "",
    rootStyle,
    labelStyle,
    controlStyle,
    label,
    sizes = "md",
    color = "blue",
    value,
    disabled,
    required,
    optional,
    checked = false,
    onCheck,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes } = useContext(FormContext);

  const { type, isRhf, rhfName, rhfValue, rhfDisabled, rhfError } = useContext(FormItemContext);

  const { lang } = useLang();

  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const showOptional = required ? false : optional;

  const gapClassName = !isRhf ? "checkbox-gap" : "";

  const sizeClassName = `checkbox-${controlSize}`;

  const errorClassName = rhfError ? "checkbox-group-error" : "";

  const disabledClassName = controlDisabled ? "checkbox-group-disabled" : "";

  const themeClassName = `checkbox-${theme}`;

  const checkedClassName = isChecked
    ? `checkbox-checked checkbox-checked-${controlColor}`
    : `checkbox-${controlColor}`;

  const mainClassName = utils.formatClassName(
    "checkbox",
    gapClassName,
    sizeClassName,
    checkedClassName,
    themeClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName("checkbox-group", errorClassName, disabledClassName);

  const controlLabelClassName = utils.formatClassName("group-label", labelClassName);

  const controlCheckClassName = utils.formatClassName("group-checked", controlClassName);

  useEffect(() => {
    if (!isRhf) return setIsChecked(checked);

    const isBoolean = typeof rhfValue === "boolean";
    const isPrimitive = typeof rhfValue !== "boolean" && typeof rhfValue !== "object";
    const isArray = Array.isArray(rhfValue);

    if (isBoolean) return setIsChecked(rhfValue);
    if (isPrimitive) return setIsChecked(rhfValue === value);
    if (isArray) {
      const isChecked = [...Array.from(rhfValue)].includes(value);
      setIsChecked(isChecked);
    }
  }, [isRhf, rhfValue, checked, value]);

  const iconSize = () => {
    if (controlSize === "sm") return 12;
    if (controlSize === "md") return 14;
    if (controlSize === "lg") return 16;
  };

  const handleRhfChecked = (value: any, checked: boolean) => {
    if (type === "default") {
      if (!value) return rhfMethods.setValue(rhfName, checked);
      else return rhfMethods.setValue(rhfName, value);
    }

    if (Array.isArray(rhfValue)) {
      let checkedItems = [...Array.from(rhfValue)];
      const idx = [...checkedItems].findIndex((item) => item === value);

      if (idx === -1) checkedItems.push(value);
      else checkedItems = [...checkedItems].filter((item) => item !== value);

      rhfMethods.setValue(rhfName, checkedItems);
    }
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setIsChecked(checked);

    if (isRhf) return handleRhfChecked(value, checked);

    onCheck?.(checked, value);
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <label className={groupClassName}>
        <input
          ref={ref}
          {...restProps}
          value={value}
          checked={isChecked}
          type="checkbox"
          className="group-control"
          disabled={controlDisabled}
          onChange={handleChecked}
        />

        <div style={controlStyle} className={controlCheckClassName}>
          <HiCheck size={iconSize()} className="checked-icon" />
        </div>

        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">({lang.common.form.others.optional})</span>}
          </div>
        )}
      </label>
    </div>
  );
};

export default forwardRef(CheckBox);
