import React from "react";
import { UI, Control } from "@/components";
import { FormRule, SelectOptions } from "./components/Control/type";
import "./style/main.scss";

const { Section, Button } = UI;

const { Form, FormItem, FormFooter, Input, InputPassword, Select, SelectTag, DatePicker } = Control;

interface FormData {
  account: string;
  password: string;
  gender: number | null;
  remember: boolean;
  tags: number[];
  birthday: Date | string;
}

function App() {
  const options: SelectOptions = [
    { label: "Item 1", value: 1 },
    { label: "Item 2", value: 2 },
    { label: "Item 3", value: 3 },
    { label: "Item 4", value: 4 },
    { label: "Item 5", value: 5 },
    { label: "Item 6", value: 6 },
    { label: "Item 7", value: 7 },
    { label: "Item 8", value: 8 },
    { label: "Item 9", value: 9 },
    { label: "Item 10", value: 10 },
    { label: "Item 11", value: 11 },
    { label: "Item 12", value: 12 },
  ];

  const initialData: FormData = {
    account: "",
    password: "",
    gender: null,
    remember: false,
    tags: [],
    birthday: new Date(),
  };

  const rules: FormRule[] = [
    {
      validate: (value) => {
        if (new Date(value).getTime() > new Date().getTime()) return "Birthday must not greater than today";
      },
    },
  ];

  return (
    <Section>
      <Form<FormData> initialData={initialData} onFinish={(formData) => console.log(formData)}>
        <FormItem name="account">
          <Input label="Account" />
        </FormItem>

        <FormItem name="password">
          <InputPassword label="Password" />
        </FormItem>

        <FormItem name="birthday" rules={rules}>
          <DatePicker label="Birthday" />
        </FormItem>

        <FormItem name="gender">
          <Select options={options} label="Gender" />
        </FormItem>

        <FormItem name="tags">
          <SelectTag options={options} label="Tag" />
        </FormItem>

        <FormFooter>
          <Button color="blue">Submit</Button>
        </FormFooter>
      </Form>
    </Section>
  );
}

export default App;
