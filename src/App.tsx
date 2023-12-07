import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { SelectOptions } from "./components/Control/type";

const { Section, Button } = UI;

const { Form, FormItem, CheckBox } = Control;

interface FormData {
  remembered: boolean;
  role: string[];
}

const initialData: FormData = {
  remembered: true,
  role: ['super-admin'],
};

function App() {
  return (
    <Section>
      <Form<FormData> initialData={initialData} onFinish={(data) => console.log(data)}>
        <FormItem name="remembered">
          <CheckBox label="Remembered" />
        </FormItem>

        <FormItem name="role" type="checkgroup">
          <CheckBox value="super-admin" label="Super Admin" />
          <CheckBox value="admin" label="Admin" />
          <CheckBox value="user" label="User" />
        </FormItem>

        <Button type="submit">Submit</Button>
      </Form>
    </Section>
  );
}

export default App;
