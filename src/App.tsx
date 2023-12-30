import React from "react";
import { UI } from "@/components";
import "./style/main.scss";
import { MenuItems } from "./components/UI/Layout/Menu/type";

const { Section, Layout } = UI;

const { Menu, Container, Head, Body, Side, Content } = Layout;

const items: MenuItems = [
  {
    id: "root-1",
    label: "Root menu 1",
    isRoot: true,
    children: [
      {
        id: "child-1",
        label: "Child menu 1",
        children: [
          { id: "child-inner-1", label: "Child-inner menu 1" },
          { id: "child-inner-2", label: "Child-inner menu 2" },
          { id: "child-inner-3", label: "Child-inner menu 3" },
          { id: "child-inner-4", label: "Child-inner menu 4" },
        ],
      },
      { id: "child-2", label: "Child menu 2" },
      { id: "child-3", label: "Child menu 3" },
      { id: "child-4", label: "Child menu 4" },
    ],
  },
  { id: "root-2", label: "Root menu 2", isRoot: true },
  { id: "root-3", label: "Root menu 3", isRoot: true },
  { id: "root-4", label: "Root menu 4", isRoot: true },
];

function App() {
  return (
    <React.Fragment>
      <Container>
        <Head>
          <Menu items={items} />
        </Head>
        <Body>
          <Side></Side>
          <Content></Content>
        </Body>
      </Container>
    </React.Fragment>
  );
}

export default App;
