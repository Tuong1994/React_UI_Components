import {
  TableHTMLAttributes,
  CSSProperties,
  Key,
  ReactNode,
  ForwardedRef,
  Fragment,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { ButtonProps } from "../Button";
import { ComponentColor } from "@/common/type";
import { Columns } from "./type";
import Pagination, { PaginationProps } from "../Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";
import TableFilter from "./TableFilter";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export type TableColor = Exclude<ComponentColor, "black" | "white" | "red" | "gray">;

export interface TableProps<M> extends TableHTMLAttributes<HTMLTableElement> {
  rootClassName?: string;
  style?: CSSProperties;
  rowKey?: Key;
  dataSource: M[];
  columns: Columns<M>;
  color?: TableColor;
  loading?: boolean;
  hasRowSelection?: boolean;
  hasRowExpand?: boolean;
  hasPagination?: boolean;
  hasFilter?: boolean;
  removeButtonTitle?: ReactNode | ReactNode[];
  cancelButtonTitle?: ReactNode | ReactNode[];
  filter?: ReactNode | ReactNode[];
  removeButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  paginationProps?: PaginationProps;
  onFilter?: () => void;
  onCancelFilter?: () => void;
  onSelectRows?: (keys: Key[]) => void;
  onChangePage?: (page: number) => void;
  expandRowTable?: (data: M) => ReactNode | null;
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
    hasPagination = false,
    hasFilter = false,
    removeButtonTitle = "Remove",
    cancelButtonTitle = "Cancel",
    removeButtonProps,
    cancelButtonProps,
    paginationProps,
    filter,
    onFilter,
    onCancelFilter,
    onSelectRows,
    onChangePage,
    expandRowTable,
    ...restProps
  }: TableProps<M>,
  ref: ForwardedRef<HTMLTableElement>
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [rowSelectedKeys, setRowSelectedKeys] = useState<Key[]>([]);

  const paginationDefaultProps: PaginationProps = {
    color,
    showContent: true,
    shape: "square",
    rootClassName: "table-pagination",
    onChangePage,
    ...paginationProps,
  };

  const colorClassName = `table-${color}`;

  const themeClassName = `table-${theme}`;

  const mainClassName = utils.formatClassName("table", colorClassName, themeClassName, rootClassName);

  useEffect(() => {
    onSelectRows?.(rowSelectedKeys);
  }, [rowSelectedKeys.length]);

  const handleSelectAllRow = () => {
    if (rowSelectedKeys.length === dataSource.length) return setRowSelectedKeys([]);
    setRowSelectedKeys([...dataSource.map((data, idx) => (rowKey ? data[rowKey as keyof M] : `row-${idx}`))]);
  };

  const handleSelectRow = (key: Key) => {
    if (rowSelectedKeys.indexOf(key) === -1) return setRowSelectedKeys((prev) => [...prev, key]);
    setRowSelectedKeys((prev) => [...prev].filter((k) => k !== key));
  };

  const handleCancelSelect = () => setRowSelectedKeys([]);

  return (
    <Fragment>
      <div style={style} className={mainClassName}>
        {hasFilter && (
          <TableFilter color={color} filter={filter} onFilter={onFilter} onCancelFilter={onCancelFilter} />
        )}
        <div className="table-content">
          <table ref={ref} {...restProps}>
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
      {hasPagination && <Pagination {...paginationDefaultProps} />}
    </Fragment>
  );
};

export default forwardRef(Table);
