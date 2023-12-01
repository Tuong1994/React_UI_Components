import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section } = UI;

const { DatePicker } = Control;

function App() {
  return (
    <Section>
      <DatePicker value={new Date("2022-11-28")} />
    </Section>
  );
}

export default App;
