import { Fragment } from "react";
import { BgAnimation, Divider } from "./components/UI";
import { BgFloatingShape } from "./components/UI/BgAnimation/type";

const { BgFloating } = BgAnimation;

const App: React.FC = () => {
  const shapes: BgFloatingShape[] = ["square", "round"];

  return shapes.map((shape) => (
    <Fragment key={shape}>
      <Divider>{shape}</Divider>
      <div style={{ width: "100%", height: "300px" }}>
        <BgFloating shape={shape} />
      </div>
    </Fragment>
  ));
};

export default App;
