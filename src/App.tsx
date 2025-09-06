import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";

const { Layout, Tabs, Section, Divider, Button } = UI;

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
            <Tabs
              items={[
                { id: "tab-1", title: "Tab 1", content: "Tab content 1" },
                { id: "tab-2", title: "Tab 2", content: "Tab content 2" },
                { id: "tab-3", title: "Tab 3", content: "Tab content 3" },
              ]}
            />
            <Tabs
              type="vertical"
              items={[
                { id: "tab-1", title: "Tab 1", content: "Tab content 1" },
                { id: "tab-2", title: "Tab 2", content: "Tab content 2" },
                { id: "tab-3", title: "Tab 3", content: "Tab content 3" },
              ]}
            />
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
