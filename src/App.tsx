import { UI } from "@/components";
import "./style/main.scss";

const { Section, Carousel } = UI;

const { Slick } = Carousel;

function App() {
  return (
    <Section>
      <Slick />
    </Section>
  );
}

export default App;
