import { Columns } from ".";
import { CheckBox } from "@/components/Control";
import { HiMinus } from "react-icons/hi2";
import TableCell from "./TableCell";

interface TableHeadProps<M> {
  columns: Columns<M>;
  totalRows: number;
  totalKeys: number;
  hasRowSelection: boolean;
  hasRowExpand: boolean;
  handleSelectAllRow: () => void;
}

const TableHead = <M extends object>({
  columns,
  totalRows,
  totalKeys,
  hasRowSelection,
  hasRowExpand,
  handleSelectAllRow,
}: TableHeadProps<M>) => {
  const renderCheckBox = () => {
    if (totalKeys > 0 && totalKeys < totalRows)
      return (
        <div className="cell-checked-mixed" onClick={handleSelectAllRow}>
          <HiMinus />
        </div>
      );
    if (totalKeys === 0) return <CheckBox color="white" onClick={handleSelectAllRow} />;
    return <CheckBox checked={totalKeys === totalRows} color="white" onClick={handleSelectAllRow} />;
  };

  return (
    <thead>
      <tr>
        {hasRowSelection && (
          <th>
            <TableCell>{renderCheckBox()}</TableCell>
          </th>
        )}

        {hasRowExpand && <th />}

        {columns.map((column) => (
          <th key={column.id}>
            <TableCell>{column.title}</TableCell>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
