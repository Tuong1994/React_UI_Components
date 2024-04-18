import { UI } from "@/components";
import "./style/main.scss";

const { Section, TypingText, Carousel } = UI;

const { Slick } = Carousel;

function App() {
  return (
    <Section>
      {/* <Slick /> */}
      <TypingText textColor="blue" />
    </Section>
  );
}

export default App;
