import React from "react";
import { FaCheck } from "react-icons/fa";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  rootClassName?: string;
  head?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

export const List: React.FC<ListProps> = React.forwardRef(
  ({ rootClassName = "", head = "Title", children, ...restProps }, ref: React.Ref<HTMLUListElement>) => {
    return (
      <div className="list">
        <h4 className="list-title">{head}</h4>
        <ul {...restProps} ref={ref} className={`list-inner ${rootClassName}`}>
          {children}
        </ul>
      </div>
    );
  }
);

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  rootClassName?: string;
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
}

export const ListItem: React.FC<ListItemProps> = React.forwardRef(
  ({ rootClassName = "", children, icon = <FaCheck />, ...restProps }, ref: React.Ref<HTMLLIElement>) => {
    return (
      <li {...restProps} ref={ref} className={`list-item ${rootClassName}`}>
        <div className="item-icon">{icon}</div>
        <div className="item-content">{children}</div>
      </li>
    );
  }
);
