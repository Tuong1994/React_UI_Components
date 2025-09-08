import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";

const { Layout, Space, Switch, Section, Divider, Button } = UI;

const { Container, Head, Body, Side, Content } = Layout;

const {} = Control;

function App() {
  const [mode, onSwitchMode] = useLayoutStore((state) => [state.layoutTheme, state.onSwitchTheme]);

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
            <Button color="blue" onClick={handleClick}>
              Change mode
            </Button>
            <Divider />
            <Space>
              <Switch sizes="sm" color="blue"  />
              <Switch sizes="md" color="green" />
              <Switch sizes="lg" color="red" />
            </Space>
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
