import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import useParticles from "./components/UI/BgAnimation/BgParticles/useParticles";
import "./style/main.scss";

const { Layout, Section, Button, Divider } = UI;

const { Container, Head, Body, Side, Content } = Layout;

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
      <Head></Head>
      <Body>
        <Side collapsable></Side>
        <Content>
          <Section>
            <Button color="green" onClick={handleClick}>
              Change mode
            </Button>
            <Divider />
            <Divider dashed plain placement="center">Divider</Divider>
            <Divider dashed plain type="vertical" placement="center">Divider</Divider>
            <span>Content</span>
            <Divider dashed plain type="vertical" placement="center">Divider</Divider>
            <span>Content</span>
            <Divider dashed plain type="vertical" placement="center">Divider</Divider>
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
