import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section } = UI;

const { CheckBox, Radio } = Control;

function App() {
  return (
    <React.Fragment>
      <Section>
        <CheckBox label="CheckBox" />
        <Radio label="Radio" />
      </Section>
    </React.Fragment>
  );
}

export default App;
