import {
  Form,
  Input,
  InputPassword,
  InputPhone,
  Select,
  DatePicker,
  Radio,
  FormItem,
} from "@/components/Control";
import { Button } from "@/components/UI";
import { useFormRule } from "./hooks";

const App: React.FC = () => {
  const { required, email, password, phone } = useFormRule();

  interface Data {
    email: string;
    password: string;
    phone: string;
    gender: string;
    role: string;
    birthday: Date;
  }

  const initialValues: Data = {
    email: "",
    password: "",
    phone: "",
    role: "",
    gender: "",
    birthday: new Date(),
  };

  const handleFinish = (data: Data) => console.log(data);

  return (
    <Form<Data> initialData={initialValues} autoFocusValidation={false} onFinish={handleFinish}>
      <FormItem name="email" rules={email()}>
        <Input required label="Email" />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label="Password" />
      </FormItem>
      <FormItem name="phone" rules={phone()}>
        <InputPhone required label="Phone" />
      </FormItem>
      <FormItem name="role" rules={required()}>
        <Select
          required
          label="Role"
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
        />
      </FormItem>
      <FormItem name="birthday" rules={required()}>
        <DatePicker required label="Birthday" />
      </FormItem>
      <FormItem name="gender" rules={required()}>
        <Radio required value="male" label="Male" />
        <Radio required value="female" label="Female" />
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default App;
