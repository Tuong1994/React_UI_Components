import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section, UList } = UI;

const { List, ListItem } = UList;

function App() {
  return (
    <Section>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
        <ListItem>Item 5</ListItem>
      </List>
    </Section>
  );
}

export default App;
