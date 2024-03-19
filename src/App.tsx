import { UI } from "@/components";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { HiUser } from "react-icons/hi2";
import "./style/main.scss";
import useLayout from "./components/UI/Layout/useLayout";
import { SelectOptions } from "./components/Control/type";

const { Section, Button, Switch, Layout } = UI;

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
    children: [
      {
        id: "child-1",
        label: "Menu 1",
        icon: <HiUser />,
        children: [
          { id: "child-inner-1", label: "Menu 1", icon: <HiUser /> },
          { id: "child-inner-2", label: "Menu 2", icon: <HiUser /> },
          { id: "child-inner-3", label: "Menu 3", icon: <HiUser /> },
          { id: "child-inner-4", label: "Menu 4", icon: <HiUser /> },
          { id: "child-inner-5", label: "Menu 5", icon: <HiUser /> },
          { id: "child-inner-7", label: "Menu 7", icon: <HiUser /> },
        ],
      },
      { id: "child-2", label: "Menu 2", icon: <HiUser /> },
      { id: "child-3", label: "Menu 3", icon: <HiUser /> },
      { id: "child-4", label: "Menu 4", icon: <HiUser /> },
      { id: "child-5", label: "Menu 5", icon: <HiUser /> },
      { id: "child-7", label: "Menu 7", icon: <HiUser /> },
    ],
  },
  { id: "2", label: "Menu 2", icon: <HiUser /> },
  { id: "3", label: "Menu 3", icon: <HiUser /> },
  { id: "4", label: "Menu 4", icon: <HiUser /> },
  { id: "5", label: "Menu 5", icon: <HiUser /> },
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
      <Head>
        <Menu items={items} />
        <Switch onSwitch={handleSwitch} />
      </Head>
      <Body>
        <Side collapsable>
          <Menu type="vertical" items={items} />
        </Side>
        <Content>
          <Section></Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
