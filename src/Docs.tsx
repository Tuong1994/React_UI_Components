import { BgAnimation } from "./components/UI";

const { BgParticles } = BgAnimation;

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <BgParticles fullScreen={false} />
    </div>
  );
};

export default App;
