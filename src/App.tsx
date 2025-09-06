import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";

<<<<<<< HEAD
const { Layout, Space, Section, Divider, Button } = UI;
=======
const { Layout, Section, Button, Divider } = UI;
>>>>>>> 729b3bc94144ddcea10cf343bde7cd6736457ba4

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
              <Button ghost color="blue">Button</Button>
              <Button ghost color="red">Button</Button>
              <Button ghost color="green">Button</Button>
              <Button ghost color="orange">Button</Button>
              <Button ghost color="yellow">Button</Button>
              <Button ghost color="purple">Button</Button>
              <Button ghost color="pink">Button</Button>
              <Button ghost color="black">Button</Button>
            </Space>
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
