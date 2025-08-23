import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import useParticles from "./components/UI/BgAnimation/BgParticles/useParticles";
import "./style/main.scss";

const { Section, Button, Divider, BgAnimation, Layout } = UI;

const { Container, Head, Body, Side, Content } = Layout;

const { BgParticles } = BgAnimation;

const {} = Control;

function App() {
  const [mode, onSwitchMode] = useLayoutStore((state) => [state.layoutTheme, state.onSwitchTheme]);

  const { collideOptions } = useParticles(true);

  const handleClick = () => {
    if (mode === ETheme.DARK) return onSwitchMode(ETheme.LIGHT);
    onSwitchMode(ETheme.DARK);
  };

  return (
    <Container style={{ height: "100vh" }}>
      <BgParticles layoutColor options={collideOptions} />
      {/* <Head></Head>
      <Body>
        <Side collapsable></Side>
        <Content>
          <Section>
            <Button color="green" onClick={handleClick}>
              Change mode
            </Button>
            <Divider />
          </Section>
        </Content>
      </Body> */}
    </Container>
  );
}

export default App;
