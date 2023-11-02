import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section, Button } = UI;

function App() {
  return (
    <Section>
      <Button loading color="blue">Button</Button>
      <Button loading color="green">Button</Button>
      <Button loading color="red">Button</Button>
      <Button loading color="orange">Button</Button>
      <Button loading color="yellow">Button</Button>
      <Button loading color="purple">Button</Button>
      <Button loading color="pink">Button</Button>
      
      <Button loading ghost color="blue">Button</Button>
      <Button loading ghost color="green">Button</Button>
      <Button loading ghost color="red">Button</Button>
      <Button loading ghost color="orange">Button</Button>
      <Button loading ghost color="yellow">Button</Button>
      <Button loading ghost color="purple">Button</Button>
      <Button loading ghost color="pink">Button</Button>
    </Section>
  );
}

export default App;
