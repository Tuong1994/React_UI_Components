import React from "react";
import { UI } from "@/components";
import "./style/main.scss";
import { TabsItems } from "./components/UI/Tabs/type";

const { Section, Tabs } = UI;

const items: TabsItems = [
  { id: "1", title: "Tab 1", content: "Content 1" },
  { id: "2", title: "Tab 2", content: "Content 2" },
  { id: "3", title: "Tab 3", content: "Content 3" },
  { id: "4", title: "Tab 4", content: "Content 4" },
  { id: "5", title: "Tab 5", content: "Content 5" },
];

function App() {
  return (
    <React.Fragment>
      <Section>
        <Tabs items={items} />
      </Section>
    </React.Fragment>
  );
}

export default App;
