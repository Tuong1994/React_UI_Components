import { UI, Control } from "@/components";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { HiUser } from "react-icons/hi2";
import "./style/main.scss";
import useLayout from "./components/UI/Layout/useLayout";
import { SelectOptions } from "./components/Control/type";

const { Section, Divider, Dropdown, Switch, Layout } = UI;

const { Select, SelectTag, TreeSelect } = Control;

const { Container, Head, Body, Side, Content, Menu } = Layout;

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
  { label: "item 3", value: "3" },
];

function App() {
  const { layoutApi } = useLayout();

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
            <Select options={options} />
            <Divider />
            <SelectTag options={options} />
            <Divider />
            <TreeSelect options={options} />
            <Divider />
            <Dropdown
              items={[
                { id: "1", label: "Item 1" },
                { id: "2", label: "Item 2" },
              ]}
            >
              Dropdown
            </Dropdown>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit mollitia similique distinctio qui
            corporis. Tenetur dolor illum tempora deserunt labore! Adipisci doloribus sint minima ab iusto
            magni nemo voluptates temporibus nostrum laboriosam nisi quisquam numquam culpa quis, aperiam
            placeat distinctio molestiae ea dolor deserunt nesciunt voluptas debitis tenetur quasi! Nesciunt
            odit voluptatibus enim fugiat quam praesentium quidem cum, voluptas provident et, eligendi id
            alias eius eaque recusandae harum officiis esse cupiditate, earum laborum. Deleniti debitis odio
            delectus eos nisi pariatur quasi exercitationem perspiciatis incidunt cumque accusamus eius
            facilis consectetur quisquam ad ea sapiente, aut veniam ut fuga aliquid qui veritatis voluptas
            ipsam. Nobis natus consequatur dolorem cupiditate incidunt illo illum tempora, enim itaque ea
            atque laboriosam magni. Quos, voluptatum. Expedita incidunt nulla eligendi, maxime ad veniam cum
            eveniet quam laudantium blanditiis debitis rem alias totam fugit eius recusandae est assumenda
            necessitatibus magnam doloremque. Odio molestias dolores maiores aut illo, nisi saepe nesciunt
            esse deserunt reiciendis fugit doloremque iure molestiae iste, labore placeat. Fugit doloremque,
            mollitia vero cupiditate similique impedit temporibus unde deleniti distinctio et odit accusantium
            libero corrupti aut quod sed maiores molestiae. Omnis nulla est ducimus molestiae animi et maxime
            accusamus nihil saepe odio? Fugiat ipsa a consequuntur ut?
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
