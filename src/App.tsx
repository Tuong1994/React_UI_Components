import { UI, Control } from "@/components";
import "./style/main.scss";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import { Divider } from "./components/UI";

const { Section, Button, Layout } = UI;

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
          <Form<Data> autoFocusValidation={false} initialData={intialValues} onFinish={handleFinish}>
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
          </Form>
        </Section>
      </Content>
    </Container>
  );
}

export default App;
