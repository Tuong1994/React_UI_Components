import { Space, Switch } from "./components/UI";
import { ComponentSize } from "./common/type";

const App: React.FC = () => {
  const sizes: ComponentSize[] = ["sm", "md", "lg"];

  const handleSwitch = (switched: boolean) => {
    console.log(switched);
  };

  return (
    <Space>
      {sizes.map((size) => (
        <Switch key={size} sizes={size} onSwitch={handleSwitch} />
      ))}
    </Space>
  );
};

export default App;
