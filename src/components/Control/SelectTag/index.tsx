import React from "react";
import { Option, SelectOptions } from "../type";
import { useFormContext } from "react-hook-form";
import { ComponentColor, ComponentSize } from "@/common/type";
import SelectTagControl from "./Control";
import SelectOption from "./Option";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import useRender from "@/hooks/useRender";
import useClickOutside from "@/hooks/useClickOutside";
import useDetectBottom from "@/hooks/useDetectBottom";

export interface SelectTagProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  options?: SelectOptions;
  defaultTags?: any[];
  sizes?: ComponentSize;
  color?: Exclude<ComponentColor, "red">;
  async?: boolean;
  loading?: boolean;
  total?: number;
  limit?: number;
  onChangeSearch?: (text: string) => void;
  onChangeSelect?: (tags: any[]) => void;
  onChangePage?: (page: number) => void;
}

const SelectTag: React.ForwardRefRenderFunction<HTMLInputElement, SelectTagProps> = (
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
    defaultTags = [],
    async = false,
    loading = false,
    total = 0,
    limit = 10,
    onChangeSearch,
    onChangeSelect,
    onChangePage,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { color: rhfColor, sizes: rhfSizes } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled } = React.useContext(FormItemContext);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [search, setSearch] = React.useState<string>("");

  const [selectedOptions, setSelectedOptions] = React.useState<SelectOptions>([]);

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
    if (!isRhf) return setSelectedOptions(defaultOptions([...defaultTags]));
    setSelectedOptions(defaultOptions([...rhfValue]));
  }, [defaultTags.length, rhfValue, isRhf]);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const showClearIcon = Boolean(search && !controlDisabled);

  const sizeClassName = `select-${controlColor}`;

  const colorClassName = `select-${controlSize}`;

  const bottomClassName = bottom ? "select-bottom" : "";

  const disabledClassName = controlDisabled ? "select-disabled" : "";

  const errorClassName = rhfError ? "select-error" : "";

  const defaultOptions = (tags: any[]) => {
    return [...options].filter((option) => {
      if (tags.includes(option.value)) return option;
    }) as SelectOptions;
  };

  const iconSize = () => {
    if (sizes === "sm") return 14;
    if (sizes === "md") return 16;
    if (sizes === "lg") return 18;
  };

  const renderValue = () => {
    if (search) return search;
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
    onChangeSearch?.(value);
  };

  const handleSelect = (option: Option) => {
    let selectedItems = [...selectedOptions];

    const idx = selectedItems.findIndex((item) => item.value === option.value);
    if (idx === -1) selectedItems = [...selectedItems, option];
    else selectedItems = selectedItems.filter((item) => item.value !== option.value);

    setSelectedOptions(selectedItems);
    setSearch("");

    const tags = [...selectedItems].map((option) => option?.value);
    if (!isRhf) return onChangeSelect?.(tags);
    else rhfMethods.setValue(rhfName, tags);
  };

  const handleClearInput = () => {
    setTouched(true);
    if (search) setSearch("");
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
      className={`select ${colorClassName} ${sizeClassName} ${bottomClassName} ${errorClassName} ${rootClassName} ${disabledClassName}`}
    >
      {label && (
        <label style={labelStyle} className={`select-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="select-wrap">
        <SelectTagControl
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
          selectedOptions={selectedOptions}
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
            dropdown={dropdown}
            selectedOptions={selectedOptions}
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

export default React.forwardRef(SelectTag);
