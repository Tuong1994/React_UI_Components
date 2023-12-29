import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section, Button } = UI;

const { Radio } = Control;

function App() {
  const [pickup, setPickup] = React.useState<string>("store");

  const handleCheck = (value: string) => setPickup(value);

  return (
    <React.Fragment>
      <Section>
        <Radio name="pickup" value="store" label="At Store" onCheck={handleCheck} />
        <Radio name="pickup" value="delivery" label="Delivery" onCheck={handleCheck} />
        <Button onClick={() => console.log(pickup)}>Button</Button>
      </Section>
    </React.Fragment>
  );
}

export default App;
