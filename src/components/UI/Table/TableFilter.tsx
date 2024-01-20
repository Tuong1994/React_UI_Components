import { ReactNode, FC } from "react";
import { UI } from "@/components";
import { TableColor } from ".";

const { Space, Button } = UI;

interface TableFilterProps {
  color: TableColor;
  filter?: ReactNode | ReactNode[];
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: FC<TableFilterProps> = ({ color, filter, onFilter, onCancelFilter }) => {
  return (
    <div className="table-filter">
      <Space align="middle">
        {filter}
        <Button sizes="sm" color={color} onClick={onFilter}>
          Save
        </Button>
        <Button sizes="sm" ghost onClick={onCancelFilter}>
          Cancel
        </Button>
      </Space>
    </div>
  );
};

export default TableFilter;
