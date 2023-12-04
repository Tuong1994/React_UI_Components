import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { SelectOptions } from "./components/Control/type";

const { Section, Button, Grid } = UI;

const { Row, Col } = Grid;

const { Form, FormItem, FormFooter, Input, InputPassword, Select, SelectTag, DatePicker, CheckBox, Radio } =
  Control;

interface FormData {
  account: string;
  password: string;
  gender: number;
  birthday: Date;
  tags: number[];
  skills: string[];
  role: number;
}

const initialData: FormData = {
  account: "",
  password: "",
  gender: -1,
  birthday: new Date(),
  tags: [],
  skills: [],
  role: -1,
};

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

function App() {
  return (
    <Section>
      <Form<FormData> initialData={initialData} onFinish={(data) => console.log(data)}>
        <FormItem name="account">
          <Input label="Name" />
        </FormItem>

        <FormItem name="password">
          <InputPassword label="Password" />
        </FormItem>

        <FormItem name="gender">
          <Select label="Gender" options={options} />
        </FormItem>

        <FormItem name="birthday">
          <DatePicker label="Birthday" />
        </FormItem>

        <FormItem name="tags">
          <SelectTag label="Tags" options={options} />
        </FormItem>

        <Row>
          <Col>
            <FormItem name="skills">
              <CheckBox value="html" label="HTML" />
            </FormItem>
          </Col>
          <Col>
            <FormItem name="skills">
              <CheckBox value="css" label="CSS" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormItem name="role">
              <Radio value={1} label="Super Admin" />
            </FormItem>
          </Col>
          <Col>
            <FormItem name="role">
              <Radio value={2} label="Admin" />
            </FormItem>
          </Col>
          <Col>
            <FormItem name="role">
              <Radio value={3} label="User" />
            </FormItem>
          </Col>
        </Row>

        <FormFooter>
          <Button type="submit">Submit</Button>
        </FormFooter>
      </Form>
    </Section>
  );
}

export default App;
