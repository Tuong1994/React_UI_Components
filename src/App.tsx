import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { SelectOptions } from "./components/Control/type";
import { FaUser } from "react-icons/fa";
import { TabsItems } from "./components/UI/Tabs/type";

const { Section, Button, Tabs } = UI;

const { Form, FormItem, CheckBox } = Control;

interface FormData {
  remembered: boolean;
  role: string[];
}

const initialData: FormData = {
  remembered: true,
  role: ["super-admin"],
};

const items: TabsItems = [
  { id: "1", title: "Tabs 1", content: "content 1" },
  { id: "2", title: "Tabs 2", content: "content 2" },
  { id: "3", title: "Tabs 3", content: "content 3" },
  { id: "4", title: "Tabs 4", content: "content 4" },
];

function App() {
  return (
    <Section>
      <Tabs color="purple" items={items} />

      {/* <Form<FormData> initialData={initialData} onFinish={(data) => console.log(data)}>
        <FormItem name="remembered">
          <CheckBox label="Remembered" />
        </FormItem>

        <FormItem name="role" type="checkgroup">
          <CheckBox value="super-admin" label="Super Admin" />
          <CheckBox value="admin" label="Admin" />
          <CheckBox value="user" label="User" />
        </FormItem>

        <Button type="submit">Submit</Button>
      </Form> */}
    </Section>
  );
}

export default App;
