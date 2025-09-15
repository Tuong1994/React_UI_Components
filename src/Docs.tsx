import { BgAnimation } from "./components/UI";
import useParticles from "./components/UI/BgAnimation/BgParticles/useParticles";

const { BgParticles } = BgAnimation;

const App: React.FC = () => {
  const { twinkleOptions } = useParticles({ hasColor: true, fullScreen: false, color: "purple" });

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <BgParticles options={twinkleOptions} />
    </div>
  );
};

export default App;
