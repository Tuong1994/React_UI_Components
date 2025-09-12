import { BgAnimation } from "./components/UI";

const { BgFloating } = BgAnimation;

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <BgFloating />
    </div>
  );
};

export default App;
