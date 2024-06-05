import { UI, Control } from "@/components";
import "./style/main.scss";

const { Section, Button } = UI;

const { Form, FormItem, Input, InputPassword, InputPhone, TextArea, Select, SelectTag, TreeSelect } = Control;

interface Data {
  email: string;
  password: string;
  phone: string;
  role: number[];
}

function App() {
  const intialValues: Data = {
    email: "",
    password: "",
    phone: "",
    role: [],
  };

  const handleFinish = (data: Data) => console.log(data);

  return (
    <Section>
      <Form<Data> autoFocusValidation={false} initialData={intialValues} onFinish={handleFinish}>
        <FormItem name="email" rules={[{ required: true, message: "This field is required" }]}>
          <Input />
        </FormItem>
        <FormItem name="password" rules={[{ required: true, message: "This field is required" }]}>
          <InputPassword />
        </FormItem>
        <FormItem name="phone" rules={[{ required: true, message: "This field is required" }]}>
          <InputPhone />
        </FormItem>
        <FormItem name="role" rules={[{ min: 1, message: "This field is required" }]}>
          <SelectTag
            options={[
              { label: "User", value: 1 },
              { label: "Admin", value: 2 },
            ]}
          />
        </FormItem>
        <Button>Submit</Button>
      </Form>
    </Section>
  );
}

export default App;
