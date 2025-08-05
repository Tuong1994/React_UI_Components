import { ToastMessage, Space, Button } from "./components/UI";
import useMessage from "./components/UI/ToastMessage/useMessage";
import {
  HiOutlineCheckCircle as SuccessIcon,
  HiOutlineXCircle as ErrorIcon,
  HiOutlineInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircle as WarningIcon } from "react-icons/pi";

const App: React.FC = () => {
  const messageApi = useMessage({
    successIcon: <SuccessIcon size={20} />,
    errorIcon: <ErrorIcon size={20} />,
    infoIcon: <InfoIcon size={20} />,
    warningIcon: <WarningIcon size={20} />,
  });

  return (
    <>
      <Space>
        <Button color="green" onClick={() => messageApi.success("This is a success message")}>
          Success
        </Button>
        <Button color="red" onClick={() => messageApi.error("This is a error message")}>
          Error
        </Button>
        <Button color="orange" onClick={() => messageApi.warning("This is a warning message")}>
          Warning
        </Button>
        <Button color="blue" onClick={() => messageApi.info("This is a info message")}>
          Info
        </Button>
      </Space>
      <ToastMessage />
    </>
  );
};

export default App;
