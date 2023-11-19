import React from "react";
import { UI } from "@/components";
import "./style/main.scss";
import { Columns } from "./components/UI/Table";
import useMessage from "./components/UI/ToastMessage/useMessage";

const { Section, ToastMessage, Button } = UI;

function App() {
  const messageApi = useMessage();

  return (
    <Section>
    
    </Section>
  );
}

export default App;
