import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { FaUser } from "react-icons/fa";

const { Section, Button, Tooltip, Layout } = UI;

const { Container, Head, Body, Side, Menu, Content } = Layout;

const items: MenuItems = [
  {
    id: "1",
    label: "Item 1",
    icon: <FaUser />,
    isRoot: true,
    children: [
      {
        id: "child-1",
        label: "Item child 1",
        isRoot: false,
        children: [
          { id: "child-inner-1", label: <a href="#">Item child inner 1</a>, isRoot: false },
          { id: "child-inner-2", label: <a href="#">Item child inner 2</a>, isRoot: false },
        ],
      },
      { id: "child-2", label: "Item child 2", isRoot: false },
      { id: "child-3", label: "Item child 3", isRoot: false },
    ],
  },
  { id: "2", label: "Item 2", icon: <FaUser />, isRoot: true },
  { id: "3", label: "Item 3", icon: <FaUser />, isRoot: true },
  { id: "4", label: "Item 4", icon: <FaUser />, isRoot: true },
];

function App() {
  return (
    <Container color="green">
      <Head>
        <Menu items={items} />
      </Head>
      <Body>
        <Side>
          <Menu type="vertical" items={items} />
        </Side>
        <Content>
          <Button onClick={() => console.log("abc")}>Button</Button>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
