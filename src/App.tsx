import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { FaUser } from "react-icons/fa";
import { SelectOptions } from "./components/Control/type";

const { Section, Button, Image, Layout } = UI;

const {
  Input,
  InputPassword,
  Select,
  SelectTag,
  TreeSelect,
  DatePicker,
  TextArea,
  CheckBox,
  Radio,
  Form,
  FormItem,
  Upload,
} = Control;

const { Image: ImageUpload, FileUpload } = Upload;

const { MultipleImageUpload, SingleImageUpload } = ImageUpload;

// const { Container, Head, Body, Side, Menu, Content } = Layout;

interface FormData {
  account: string;
  password: string;
  gender: string;
  tags: string[];
  birthday: Date | string;
  note: string;
  role: string;
  ids: string[];
}

const items: MenuItems = [
  {
    id: "1",
    label: "Item 1",
    icon: <FaUser />,
    isRoot: true,
    children: [
      {
        id: "child-1",
        label: "Item child 1",
        isRoot: false,
        children: [
          { id: "child-inner-1", label: <a href="#">Item child inner 1</a>, isRoot: false },
          { id: "child-inner-2", label: <a href="#">Item child inner 2</a>, isRoot: false },
        ],
      },
      { id: "child-2", label: "Item child 2", isRoot: false },
      { id: "child-3", label: "Item child 3", isRoot: false },
      { id: "child-4", label: "Item child 4", isRoot: false },
      { id: "child-5", label: "Item child 5", isRoot: false },
      { id: "child-6", label: "Item child 6", isRoot: false },
      { id: "child-7", label: "Item child 7", isRoot: false },
    ],
  },
  { id: "2", label: "Item 2", icon: <FaUser />, isRoot: true },
  { id: "3", label: "Item 3", icon: <FaUser />, isRoot: true },
  { id: "4", label: "Item 4", icon: <FaUser />, isRoot: true },
];

function App() {
  const initialValue: FormData = {
    account: "",
    password: "",
    gender: "",
    tags: [],
    birthday: new Date(),
    note: "",
    role: "",
    ids: [],
  };

  const options: SelectOptions = [
    {
      label: "Item 1",
      value: 1,
      children: [
        { label: "Item 2", value: 2 },
        { label: "Item 3", value: 3 },
        { label: "Item 4", value: 4 },
        { label: "Item 5", value: 5 },
      ],
    },
    { label: "Item 2", value: 2 },
    { label: "Item 3", value: 3 },
    { label: "Item 4", value: 4 },
    { label: "Item 5", value: 5 },
  ];

  return (
    <React.Fragment>
      {/* <Container color="green">
       <Head>
         <Menu items={items} />
       </Head>
       <Body>
         <Side>
           <Menu type="vertical" items={items} />
         </Side>
         <Content>
           <Button onClick={() => console.log("abc")}>Button</Button>
         </Content>
       </Body>
     </Container> */}

      <Section>
        <Image hasView />
        <MultipleImageUpload />
      </Section>

      <Section>
        <Form<FormData> color="red" shape="round" initialData={initialValue}>
          <SingleImageUpload />
          
          <MultipleImageUpload />

          <FileUpload />

          <FormItem name="account">
            <Input label="Account" />
          </FormItem>
          <FormItem name="password">
            <InputPassword label="Password" />
          </FormItem>
          <FormItem name="gender">
            <Select label="Gender" options={options} />
          </FormItem>
          <FormItem name="tags">
            <SelectTag label="Tags" options={options} />
          </FormItem>
          <FormItem name="tags">
            <TreeSelect label="Tree Tags" options={options} />
          </FormItem>
          <FormItem name="birthday">
            <DatePicker label="Birthday" />
          </FormItem>
          <FormItem name="note">
            <TextArea label="Note" />
          </FormItem>
          <FormItem name="ids" type="checkgroup">
            <CheckBox value="1" label="ID 1" />
            <CheckBox value="2" label="ID 2" />
          </FormItem>
          <FormItem name="role">
            <Radio value="admin" label="Admin" />
            <Radio value="user" label="User" />
          </FormItem>

          <Button>Save</Button>
        </Form>
      </Section>
    </React.Fragment>
  );
}

export default App;
