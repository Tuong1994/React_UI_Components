import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";

const { Section, Button, Divider, BgAnimation, Layout } = UI;

const { Container, Head, Body, Side, Content } = Layout;

const { BgFloating } = BgAnimation;

const {} = Control;

function App() {
  const [mode, onSwitchMode] = useLayoutStore((state) => [state.layoutTheme, state.onSwitchTheme]);

  const handleClick = () => {
    if (mode === ETheme.DARK) return onSwitchMode(ETheme.LIGHT);
    onSwitchMode(ETheme.DARK);
  };

  return (
    <div style={{width: '100%', height: '500px'}}>
      <BgFloating />
    </div>
    // <Container>
    //   <Head></Head>
    //   <Body>
    //     <Side collapsable></Side>
    //     <Content>
    //       <Section>
    //         <Button color="green" onClick={handleClick}>
    //           Change mode
    //         </Button>
    //         <Divider />
    //       </Section>
    //     </Content>
    //   </Body>
    // </Container>
  );
}

export default App;
