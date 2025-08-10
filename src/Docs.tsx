import { Space } from "./components/UI";
import { Radio } from "@/components/Control";

const App: React.FC = () => {
  return (
    <Space>
      <Radio label="Radio" />
      <Radio optional label="Radio optional" />
      <Radio required label="Radio required" />
    </Space>
  );
};

export default App;
