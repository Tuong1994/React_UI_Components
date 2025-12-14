import { Space } from "@/components/UI";
import { DatePicker } from "@/components/Control";

const App: React.FC = () => {
  return (
    <Space>
      <DatePicker label="Left" placement="left" />
      <DatePicker label="Right" placement="right" />
    </Space>
  );
};

export default App;
