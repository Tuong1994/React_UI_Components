import { ReactNode, FC } from "react";
import { UI } from "@/components";
import type { TableColor } from ".";
import type { ButtonProps } from "../Button";

const { Space, Button, Flex } = UI;

const { FlexRow, FlexCol } = Flex;

export interface TableFilterProps {
  color: TableColor;
  filter?: ReactNode | ReactNode[];
  filterButtonTitle?: ReactNode | ReactNode[];
  cancelFilterButtonTitle?: ReactNode | ReactNode[];
  filterButtonProps?: ButtonProps;
  cancelFilterButtonProps?: ButtonProps;
  hasFilterButton?: boolean;
  hasCancelFilterButton?: boolean;
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: FC<TableFilterProps> = ({
  color,
  filter,
  filterButtonTitle = "Filter",
  cancelFilterButtonTitle = "Cancel",
  filterButtonProps,
  cancelFilterButtonProps,
  hasFilterButton = true,
  hasCancelFilterButton = true,
  onFilter,
  onCancelFilter,
}) => {
  const filterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    color,
    onClick: onFilter,
    ...filterButtonProps,
  };

  const cancelFilterButtonDefaultProps: ButtonProps = {
    sizes: "sm",
    ghost: true,
    onClick: onCancelFilter,
    ...cancelFilterButtonProps,
  };

  return (
    <FlexRow rootClassName="table-filter">
      {filter}
      <FlexCol>
        <Space align="middle">
          {hasFilterButton && <Button {...filterButtonDefaultProps}>{filterButtonTitle}</Button>}
          {hasCancelFilterButton && (
            <Button {...cancelFilterButtonDefaultProps}>{cancelFilterButtonTitle}</Button>
          )}
        </Space>
      </FlexCol>
    </FlexRow>
  );
};

export default TableFilter;
