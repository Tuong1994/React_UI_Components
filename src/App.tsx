import React from "react";
import { UI } from "@/components";
import "./style/main.scss";
import { TabsItems } from "./components/UI/Tabs/type";

const { Section, Tabs, Divider } = UI;

const items: TabsItems = [
  {
    id: "1",
    title: "Tab 1",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.",
  },
  {
    id: "2",
    title: "Tab 2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.",
  },
  {
    id: "3",
    title: "Tab 3",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.",
  },
  {
    id: "4",
    title: "Tab 4",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.",
  },
  { id: "5", title: "Tab 5", content: "Content 5" },
  { id: "6", title: "Tab 6", content: "Content 6" },
  { id: "7", title: "Tab 7", content: "Content 7" },
  { id: "8", title: "Tab 8", content: "Content 8" },
  { id: "9", title: "Tab 9", content: "Content 9" },
  { id: "10", title: "Tab 10", content: "Content 10" },
];

function App() {
  return (
    <React.Fragment>
      <Section>
        <Tabs items={items} />
        <Divider />
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus
        impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus impedit, incidunt delectus ullam
        necessitatibus qui voluptatem quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
        aperiam mollitia voluptatibus impedit, incidunt delectus ullam necessitatibus qui voluptatem
        quia.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aperiam mollitia voluptatibus
        impedit, incidunt delectus ullam necessitatibus qui voluptatem quia.
      </Section>
    </React.Fragment>
  );
}

export default App;
