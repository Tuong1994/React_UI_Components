import { UI, Control } from "@/components";
import { ETheme } from "./components/UI/Layout/Context";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";
import Docs from "./Docs";
import { useState } from "react";
import { useFormRule } from "./hooks";

const { Layout, Space, Switch, Section, Divider, Button } = UI;

const { Container, Head, Body, Side, Content } = Layout;

const { Form, FormItem, Editor } = Control;

type EditorData = {
  content: "";
};

function App() {
  const [mode, onSwitchMode] = useLayoutStore((state) => [state.layoutTheme, state.onSwitchTheme]);

  const [content, setContent] = useState("");

  const { required } = useFormRule();

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
            <Form<EditorData> initialData={{ content: "" }}>
              <FormItem name="content" rules={required()}>
                <Editor label="Editor" content={content} onChangeEditor={(value) => console.log(value)} />
              </FormItem>
            </Form>
            {/* <Docs /> */}
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
