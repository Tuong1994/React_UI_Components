import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectDate } from "../type";
import FormContext from "../Form/Context";
import DatePickerControl from "./Control";
import DatePickerCalender from "./Calendar";
import useRender from "@/hooks/useRender";
import useClickOutside from "@/hooks/useClickOutside";
import useDetectBottom from "@/hooks/useDetectBottom";

export interface DatePickerProps {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  value?: Date;
  format?: string;
  max?: "today" | string;
  min?: "today" | string;
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink";
  onChangeSelect?: (date: Date) => void;
}

const DatePicker: React.ForwardRefRenderFunction<HTMLInputElement, DatePickerProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    disabled,
    min,
    max,
    sizes = "md",
    color = "blue",
    format = "DD/MM/YYYY",
    value = new Date(),
    onChangeSelect,
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormContext);

  const [selectedDate, setSelectedDate] = React.useState<Date>(value);

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const [touched, setTouched] = React.useState<boolean>(false);

  const datepickerRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(datepickerRef);

  useClickOutside(datepickerRef, setDropdown);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const showResetIcon = Boolean(selectedDate.getDate() !== new Date().getDate() && !controlDisabled);

  const sizeClassName = `datepicker-${sizes}`;

  const colorClassName = `datepicker-${color}`;

  const disabledClassName = controlDisabled ? "datepicker-disabled" : "";

  const errorClassName = rhfError ? "datepicker-error" : "";

  // Trigger validation
  React.useEffect(() => {
    if (!isRhf) return;

    if (touched && !dropdown && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && !dropdown && rhfValue) rhfMethods.trigger(rhfName);

    if (touched && !dropdown) setTouched(false);
  }, [touched, dropdown, isRhf, rhfName, rhfValue]);

  // Set default value
  React.useEffect(() => {
    if (isRhf && rhfValue) setSelectedDate(rhfValue) 
  }, [isRhf, rhfValue]);

  const iconSize = () => {
    if (sizes === "sm") return 14;
    if (sizes === "md") return 16;
    if (sizes === "lg") return 18;
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setTouched(true);
  };

  const handleSelect = (date: SelectDate) => {
    setSelectedDate(date.fullDate);
    onChangeSelect?.(date.fullDate);
    if (isRhf) rhfMethods.setValue(rhfName, date.fullDate);
  };

  const handleResetInput = () => {
    setTouched(true);
    setSelectedDate(new Date());
    if (isRhf) rhfMethods.setValue(rhfName, new Date());
  };

  return (
    <div
      ref={datepickerRef}
      style={rootStyle}
      className={`datepicker ${colorClassName} ${sizeClassName} ${errorClassName} ${rootClassName} ${disabledClassName}`}
    >
      {label && (
        <label style={labelStyle} className={`datepicker-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="datepicker-wrap" ref={ref}>
        <DatePickerControl
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          inputClassName={inputClassName}
          selectedDate={selectedDate}
          showResetIcon={showResetIcon}
          format={format}
          iconSize={iconSize}
          handleResetInput={handleResetInput}
          handleDropdown={handleDropdown}
        />

        {render && (
          <DatePickerCalender
            min={min}
            max={max}
            bottom={bottom}
            dropdown={dropdown}
            selectedDate={selectedDate}
            handleSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DatePicker);
