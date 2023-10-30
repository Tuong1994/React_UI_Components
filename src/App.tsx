import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { HiArchiveBox, HiCheck } from "react-icons/hi2";

const { Section, Layout } = UI;

const { Container, Head, Body, Side, Content, Menu } = Layout;

function App() {
  const items: MenuItems = [
    {
      id: "1",
      label: "Item 1",
      icon: <HiArchiveBox />,
      children: [
        { id: "item-1-child-1", label: "Child 1" },
        { id: "item-1-child-2", label: "Child 2" },
      ],
    },
    {
      id: "2",
      label: "Item 2",
      icon: <HiArchiveBox />,
      children: [
        {
          id: "item-2-child-1",
          label: "Child 1",
          children: [
            { id: "subchild-1", label: "Subchild 1" },
            { id: "subchild-2", label: "Subchild 2" },
            { id: "subchild-3", label: "Subchild 3" },
            { id: "subchild-4", label: "Subchild 4" },
            { id: "subchild-5", label: "Subchild 5" },
          ],
        },
        {
          id: "item-2-child-2",
          label: "Child 2",
        },
      ],
    },
    {
      id: "3",
      label: "Item 3",
      icon: <HiArchiveBox />,
    },
  ];

  return (
    <React.Fragment>
      <Container>
        <Head>
          <Menu items={items} />
        </Head>
        <Body>
          <Side>
            <Menu items={items} type="vertical" />
          </Side>
          <Content></Content>
        </Body>
      </Container>
    </React.Fragment>
  );
}

export default App;
