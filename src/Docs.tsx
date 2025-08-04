import { Alert, Space, Button } from "./components/UI";
import {
  HiCheckCircle as SuccessIcon,
  HiXCircle as ErrorIcon,
  HiInformationCircle as InfoIcon,
} from "react-icons/hi2";
import { PiWarningCircleFill as WarningIcon } from "react-icons/pi";
import useAlert from "./components/UI/Alert/useAlert";

const App: React.FC = () => {
  const alertApi = useAlert({
    placement: "top",
    icons: {
      successIcon: <SuccessIcon />,
      errorIcon: <ErrorIcon />,
      infoIcon: <InfoIcon />,
      warningIcon: <WarningIcon />,
    },
  });

  return (
    <>
      <Space>
        <Button color="green" onClick={() => alertApi.success("This is a success message")}>
          Success
        </Button>
        <Button color="red" onClick={() => alertApi.error("This is a error message")}>
          Error
        </Button>
        <Button color="orange" onClick={() => alertApi.warning("This is a warning message")}>
          Warningss
        </Button>
        <Button color="blue" onClick={() => alertApi.info("This is a info message")}>
          Info
        </Button>
      </Space>
      <Alert />
    </>
  );
};

export default App;
