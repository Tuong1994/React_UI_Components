import React from "react";
import { UI, Control } from "@/components";
import "./style/main.scss";
import { SelectOptions } from "./components/Control/type";

const { Section, Button, Badge } = UI;

const { Form, FormItem, Input, InputPassword, Select, SelectTag, TextArea, DatePicker, Upload } = Control;

const { Image, FileUpload } = Upload;

interface FormData {
  account: string;
  password: string;
  gender: number;
  birthday: Date;
  tags: number[];
  note: string;
}

const initialData: FormData = {
  account: "",
  password: "",
  gender: -1,
  birthday: new Date(),
  tags: [],
  note: "",
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
  const [image, setImage] = React.useState<File | null>(null)

  const [images, setImages] = React.useState<File[]>([]);

  return (
    <Section>
      <Form<FormData> color="orange" initialData={initialData} onFinish={(data) => console.log(image)}>
        <Image.SingleImageUpload onUpload={(file) => setImage(file)} />

        <Image.MultipleImageUpload onUpload={(files) => setImages(files)} />

        <FileUpload />

        {/* <FormItem name="account" rules={[{ required: true, message: "This field is required" }]}>
          <Input label="Account" />
        </FormItem>

        <FormItem name="password" rules={[{ required: true, message: "This field is required" }]}>
          <InputPassword label="Password" />
        </FormItem>

        <FormItem name="gender" rules={[{ min: 1, message: "This field is required" }]}>
          <Select label="Gender" options={options} />
        </FormItem>

        <FormItem name="birthday">
          <DatePicker label="Birthday" />
        </FormItem>

        <FormItem name="tags" rules={[{ required: true, message: "This field is required" }]}>
          <SelectTag label="Tags" options={options} />
        </FormItem>

        <FormItem name="note" rules={[{ required: true, message: "This field is required" }]}>
          <TextArea label="Note" />
        </FormItem> */}

        <Button type="submit">Submit</Button>
      </Form>

      <Button loading>Loading</Button>
    </Section>
  );
}

export default App;
