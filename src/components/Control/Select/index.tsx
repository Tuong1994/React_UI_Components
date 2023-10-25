import React from "react";
import { Option, SelectOptions } from "../type";
import { useFormContext } from "react-hook-form";
import SelectControl from "./Control";
import FormContext from "../Form/Context";
import SelectOption from "./Option";
import useRender from "@/hooks/useRender";
import useClickOutside from "@/hooks/useClickOutside";
import useDetectBottom from "@/hooks/useDetectBottom";

export interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  options?: SelectOptions;
  defaultValue?: number | string;
  sizes?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "orange" | "yellow" | "purple" | "pink";
  async?: boolean;
  loading?: boolean;
  total?: number;
  limit?: number;
  onChangeSearch?: (text: string) => void;
  onChangeSelect?: (value: string | number | boolean) => void;
  onChangePage?: (page: number) => void;
}

const Select: React.ForwardRefRenderFunction<HTMLInputElement, SelectProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    sizes = "md",
    color = "blue",
    disabled,
    options = [],
    defaultValue,
    async = false,
    loading = false,
    total = 0,
    limit = 10,
    onBlur,
    onChangeSearch,
    onChangeSelect,
    onChangePage,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormContext);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [search, setSearch] = React.useState<string>("");

  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const [touched, setTouched] = React.useState<boolean>(false);

  const selectRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(dropdown);

  const bottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setDropdown);

  const totalPages = Math.ceil(total / limit);

  // Trigger validation
  React.useEffect(() => {
    if (!isRhf) return;

    if (touched && !dropdown && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && !dropdown && rhfValue) rhfMethods.trigger(rhfName);

    if (touched && !dropdown) setTouched(false);
  }, [touched, dropdown, isRhf, rhfName, rhfValue]);

  // Set default option
  React.useEffect(() => {
    let defaultOption: Option | null = null;
    if (!isRhf) defaultOption = [...options].find((option) => option.value === defaultValue) as Option;
    else defaultOption = [...options].find((option) => option.value === rhfValue) as Option;
    setSelectedOption(defaultOption);
  }, [defaultValue, rhfValue, isRhf]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const showClearIcon = Boolean((search || selectedOption) && !controlDisabled);

  const sizeClassName = `select-${sizes}`;

  const colorClassName = `select-${color}`;

  const disabledClassName = controlDisabled ? "select-disabled" : "";

  const errorClassName = rhfError ? "select-error" : "";

  const iconSize = () => {
    if (sizes === "sm") return 14;
    if (sizes === "md") return 16;
    if (sizes === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
    if (selectedOption) return selectedOption.label;
    return "";
  };

  const filterOption = () => {
    if (async) return options;
    if (!search) return options;
    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setTouched(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedOption(null);
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearch("");
    onChangeSelect?.(option.value);
    if (isRhf) rhfMethods.setValue(rhfName, option.value);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
    if (selectedOption) setSelectedOption(null);
    if (isRhf) rhfMethods.setValue(rhfName, null);
  };

  const handleChangePage = (type: "prev" | "next") => {
    let page = currentPage;
    if (type === "prev") page -= 1;
    else page += 1;
    setCurrentPage(page);
    onChangePage?.(page);
  };

  return (
    <div
      ref={selectRef}
      style={rootStyle}
      className={`select ${colorClassName} ${sizeClassName} ${errorClassName} ${rootClassName} ${disabledClassName}`}
    >
      {label && (
        <label style={labelStyle} className={`select-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="select-wrap">
        <SelectControl
          {...restProps}
          ref={ref}
          inputClassName={inputClassName}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          loading={loading}
          rhfError={rhfError}
          dropdown={dropdown}
          controlDisabled={controlDisabled}
          showClearIcon={showClearIcon}
          iconSize={iconSize}
          onChange={handleSearch}
          renderValue={renderValue}
          handleClearInput={handleClearInput}
          handleDropdown={handleDropdown}
        />

        {render && (
          <SelectOption
            async={async}
            loading={loading}
            bottom={bottom}
            dropdown={dropdown}
            selectedOption={selectedOption}
            currentPage={currentPage}
            totalPages={totalPages}
            options={filterOption()}
            iconSize={iconSize}
            handleSelect={handleSelect}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Select);
