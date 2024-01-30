import { FC, ReactNode } from "react";

interface OptionEmptyProps {
  emptyContent?: ReactNode | ReactNode[];
}

const OptionEmpty: FC<OptionEmptyProps> = ({ emptyContent = "No option" }) => {
  return <div className="list-empty">{emptyContent}</div>;
};

export default OptionEmpty;
