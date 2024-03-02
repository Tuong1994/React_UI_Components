import { UI, Control } from "@/components";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { HiUser } from "react-icons/hi2";
import "./style/main.scss";
import useLayout from "./components/UI/Layout/useLayout";
import { SelectOptions } from "./components/Control/type";

const { Section, Button, Switch, Layout } = UI;

const { Form, FormItem, Input, InputPassword, Select, TextArea } = Control;

const { Container, Head, Body, Side, Content, Menu } = Layout;

interface Data {
  name: string;
  password: string;
  gender: string;
  note: string;
}

const items: MenuItems = [
  {
    id: "1",
    label: "Menu 1",
    icon: <HiUser />,
    isRoot: true,
    children: [
      { id: "1", label: "Menu 1", icon: <HiUser /> },
      { id: "2", label: "Menu 2", icon: <HiUser /> },
      { id: "3", label: "Menu 3", icon: <HiUser /> },
      { id: "4", label: "Menu 4", icon: <HiUser /> },
      { id: "5", label: "Menu 5", icon: <HiUser /> },
      { id: "7", label: "Menu 7", icon: <HiUser /> },
    ],
  },
  { id: "2", label: "Menu 2", icon: <HiUser />, isRoot: true },
  { id: "3", label: "Menu 3", icon: <HiUser />, isRoot: true },
  { id: "4", label: "Menu 4", icon: <HiUser />, isRoot: true },
  { id: "5", label: "Menu 5", icon: <HiUser />, isRoot: true },
];

const options: SelectOptions = [
  { label: "item 1", value: "1" },
  { label: "item 2", value: "2" },
  {
    label: "item 3",
    value: "3",
    children: [
      { label: "item 1", value: "1" },
      { label: "item 2", value: "2" },
      { label: "item 3", value: "3" },
    ],
  },
];

function App() {
  const { layoutApi } = useLayout();

  const initialData: Data = { name: "Jack", password: "123456", gender: "1", note: "Note" };

  const handleSwitch = (switched: boolean) => {
    if (switched) layoutApi.onSwitchTheme("dark");
    else layoutApi.onSwitchTheme("light");
  };

  return (
    <Container>
      <Head></Head>
      <Body>
        <Side collapsable>
          <Menu type="vertical" items={items} />
        </Side>
        <Content>
          <Section>
            <Switch onSwitch={handleSwitch} />
            <Form<Data> initialData={initialData} onFinish={(data) => console.log(data)}>
              <FormItem name="name" rules={[{ required: true, message: "This field is required" }]}>
                <Input />
              </FormItem>
              <FormItem name="password">
                <InputPassword />
              </FormItem>
              <FormItem name="gender">
                <Select options={options} />
              </FormItem>
              <FormItem name="note">
                <TextArea />
              </FormItem>
              <Button type="submit">Save</Button>
            </Form>
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
