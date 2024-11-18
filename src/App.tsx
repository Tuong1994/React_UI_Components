import { UI, Control } from "@/components";
import "./style/main.scss";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import { useState } from "react";
import useAlert from "./components/UI/Alert/useAlert";
import { FaUser } from "react-icons/fa";

const { Section, Button, Divider, Accordion, Alert, Badge, Breadcrumb, Tabs, Grid, Layout } = UI;

const { Container, Content } = Layout;

const {
  Form,
  FormItem,
  Input,
  InputPassword,
  InputPhone,
  TextArea,
  DatePicker,
  Select,
  SelectTag,
  Radio,
  CheckBox,
} = Control;

interface Data {
  email: string;
  password: string;
  phone: string;
  message: string;
  gender: string;
  birthday: Date | string;
  role: number[];
}

function App() {
  const [mode, onSwitchMode] = useLayoutStore((state) => [state.layoutTheme, state.onSwitchTheme]);

  const intialValues: Data = {
    email: "",
    password: "",
    phone: "",
    message: "",
    gender: "",
    birthday: new Date(),
    role: [],
  };

  const items = [
    { id: "item-1", title: "Item 1", content: <div>Content 1</div>, icon: <FaUser /> },
    { id: "item-2", title: "Item 2", content: <div>Content 2</div>, icon: <FaUser /> },
    { id: "item-3", title: "Item 3", content: <div>Content 3</div>, icon: <FaUser /> },
    { id: "item-4", title: "Item 4", content: <div>Content 4</div>, icon: <FaUser /> },
    { id: "item-5", title: "Item 5", content: <div>Content 5</div>, icon: <FaUser /> },
    { id: "item-6", title: "Item 6", content: <div>Content 6</div>, icon: <FaUser /> },
    { id: "item-7", title: "Item 7", content: <div>Content 7</div>, icon: <FaUser /> },
    { id: "item-8", title: "Item 8", content: <div>Content 8</div>, icon: <FaUser /> },
    { id: "item-9", title: "Item 9", content: <div>Content 9</div>, icon: <FaUser /> },
    { id: "item-10", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-11", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-12", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-13", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-14", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-15", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-16", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-17", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-18", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-19", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
    { id: "item-20", title: "Item 10", content: <div>Content 10</div>, icon: <FaUser /> },
  ];

  const handleFinish = (data: Data) => console.log(data);

  const handleClick = () => {
    if (mode === "dark") return onSwitchMode("light");
    onSwitchMode("dark");
  };

  return (
    <Container>
      <Content>
        <Section>
          <Button onClick={handleClick}>Change mode</Button>
          <Divider />

          <Grid xs={2} span={12}>
            {items.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))}
          </Grid>

          {/* <Form<Data> autoFocusValidation={false} initialData={intialValues} onFinish={handleFinish}>
            <FormItem name="email">
              <Input />
            </FormItem>
            <FormItem name="password">
              <InputPassword label="Password" optional />
            </FormItem>
            <FormItem name="phone">
              <InputPhone />
            </FormItem>
            <FormItem name="gender">
              <Select
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </FormItem>
            <FormItem name="birthday">
              <DatePicker />
            </FormItem>
            <FormItem name="role">
              <SelectTag
                options={[
                  { label: "User", value: 1 },
                  { label: "Admin", value: 2 },
                ]}
              />
            </FormItem>
            <FormItem name="message">
              <TextArea />
            </FormItem>
            <FormItem name="gender">
              <CheckBox value="male" label="Male" />
              <CheckBox value="female" label="Female" />
            </FormItem>
            <FormItem name="gender">
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
            </FormItem>
            <Button>Submit</Button>
          </Form> */}
        </Section>
      </Content>
    </Container>
  );
}

export default App;
