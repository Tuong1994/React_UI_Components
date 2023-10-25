import React from "react";
import { Option, SelectOptions } from "../type";
import OptionItem from "./OptionItem";
import OptionPagination from "./OptionPagination";
import OptionEmpty from "./OptionEmpty";
import OptionLoading from "./OptionLoading";

export interface SelectTagOptionProps {
  async: boolean;
  dropdown: boolean;
  loading: boolean;
  bottom: boolean;
  options: SelectOptions;
  selectedOptions: SelectOptions;
  currentPage: number;
  totalPages: number;
  iconSize: () => number | undefined;
  handleSelect: (option: Option) => void;
  handleChangePage: (type: "prev" | "next") => void;
}

const SelectTagOption: React.ForwardRefRenderFunction<HTMLDivElement, SelectTagOptionProps> = (
  {
    async,
    loading,
    dropdown,
    bottom,
    options = [],
    selectedOptions,
    currentPage,
    totalPages,
    iconSize,
    handleSelect,
    handleChangePage,
  },
  ref
) => {
  const optionScrollClassName = options.length > 10 ? "option-list-scroll" : "";

  const dropdownClassName = dropdown ? "wrap-option-active" : "";

  const bottomClassName = bottom ? "wrap-option-bottom" : "";

  const isSelected = (option: Option) => selectedOptions.includes(option);

  const renderContent = () => {
    if (loading) return <OptionLoading />;
    if (!options.length) return <OptionEmpty />;
    return options.map((option, idx) => (
      <OptionItem
        key={idx}
        option={option}
        iconSize={iconSize}
        isSelected={isSelected}
        handleSelect={handleSelect}
      />
    ));
  };

  return (
    <div ref={ref} className={`wrap-option ${bottomClassName} ${dropdownClassName}`}>
      <div className={`option-list ${optionScrollClassName}`}>{renderContent()}</div>

      {async && totalPages > 1 && (
        <OptionPagination
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default React.forwardRef(SelectTagOption);
