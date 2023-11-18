import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import { ButtonProps } from "../Button";
import TableLoading from "./TableLoading";

type TableColumn<R = unknown> = {
  id: string;
  title: React.ReactNode | React.ReactNode[];
  dataIndex: keyof R;
  render?: (data: any, record: R, idx: number) => React.ReactNode | React.ReactNode[];
};

export type Columns<R = unknown> = TableColumn<R>[];

export type TableColor = "blue" | "green" | "orange" | "yellow" | "purple" | "pink";

export interface TableProps<M> {
  rootClassName?: string;
  style?: React.CSSProperties;
  rowKey?: React.Key;
  dataSource: M[];
  columns: Columns<M>;
  color?: TableColor;
  loading?: boolean;
  hasRowSelection?: boolean;
  hasRowExpand?: boolean;
  removeButtonTitle?: React.ReactNode | React.ReactNode[];
  cancelButtonTitle?: React.ReactNode | React.ReactNode[];
  removeButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  onSelectRows?: (keys: React.Key[]) => void;
  expandRowTable?: (data: M) => React.ReactNode | null;
}

const Table = <M extends object>(
  {
    rootClassName = "",
    style,
    dataSource = [],
    columns = [],
    rowKey,
    color = "blue",
    loading,
    hasRowSelection = false,
    hasRowExpand = false,
    removeButtonTitle = "Remove",
    cancelButtonTitle = "Cancel",
    removeButtonProps,
    cancelButtonProps,
    onSelectRows,
    expandRowTable,
  }: TableProps<M>,
  ref: React.ForwardedRef<HTMLTableElement>
) => {
  const [rowSelectedKeys, setRowSelectedKeys] = React.useState<React.Key[]>([]);

  const colorClassName = `table-${color}`;

  React.useEffect(() => {
    onSelectRows?.(rowSelectedKeys);
  }, [rowSelectedKeys.length]);

  const handleSelectAllRow = () => {
    if (rowSelectedKeys.length === dataSource.length) return setRowSelectedKeys([]);
    setRowSelectedKeys([...dataSource.map((data, idx) => (rowKey ? data[rowKey as keyof M] : `row-${idx}`))]);
  };

  const handleSelectRow = (key: React.Key) => {
    if (rowSelectedKeys.indexOf(key) === -1) return setRowSelectedKeys((prev) => [...prev, key]);
    setRowSelectedKeys((prev) => [...prev].filter((k) => k !== key));
  };

  const handleCancelSelect = () => setRowSelectedKeys([]);

  return (
    <div style={style} className={`table ${colorClassName} ${rootClassName}`}>
      <div className="table-content">
        <table ref={ref}>
          <TableHead<M>
            columns={columns}
            totalRows={dataSource.length}
            rowSelectedKeys={rowSelectedKeys}
            hasRowExpand={hasRowExpand}
            hasRowSelection={hasRowSelection}
            removeButtonTitle={removeButtonTitle}
            cancelButtonTitle={cancelButtonTitle}
            removeButtonProps={removeButtonProps}
            cancelButtonProps={cancelButtonProps}
            onSelectRow={onSelectRows}
            handleSelectAllRow={handleSelectAllRow}
            handleCancelSelect={handleCancelSelect}
          />

          {dataSource.length > 0 && (
            <TableBody<M>
              rowKey={rowKey}
              dataSource={dataSource}
              columns={columns}
              color={color}
              rowSelectedKeys={rowSelectedKeys}
              hasRowExpand={hasRowExpand}
              hasRowSelection={hasRowSelection}
              handleSelectRow={handleSelectRow}
              expandRowTable={expandRowTable}
            />
          )}
        </table>

        {dataSource.length === 0 && <TableEmpty />}
      </div>

      {loading && <TableLoading />}
    </div>
  );
};

export default React.forwardRef(Table);
