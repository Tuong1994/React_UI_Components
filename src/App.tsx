import React from "react";
import { UI, Control } from "@/components";
import { SelectOptions } from "./components/Control/type";
import { Fa500Px, FaAccusoft, FaUser } from "react-icons/fa";
import "./style/main.scss";

const { Section } = UI;

const { TreeSelect, Select, SelectTag } = Control;

interface Data {
  gender: number | null;
  tags: any[];
}

function App() {
  const options: SelectOptions = [
    {
      label: "Item 1",
      value: 1,
      children: [
        {
          label: "Child 1",
          value: 11,
          children: [
            { label: "Child 4", value: 14 },
            { label: "Child 5", value: 15 },
          ],
        },
        { label: "Child 2", value: 12 },
        { label: "Child 3", value: 13 },
      ],
    },
    { label: "Item 2", value: 2 },
    { label: "Item 3", value: 3 },
    { label: "Item 4", value: 4 },
    { label: "Item 5", value: 5 },
    { label: "Item 6", value: 6 },
  ];

  return (
    <Section>
      <TreeSelect options={options} />
    </Section>
  );
}

export default App;
