import { UI, Control } from "@/components";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";
import { Columns } from "./components/UI/Table/type";

const { Section, Button, Divider, Table, Layout } = UI;

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
  TreeSelect,
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

interface TableData {
  email: string;
  phone: string;
  gender: string;
  birthday: Date | string;
  role: string;
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

  const dataSource: TableData[] = [
    {
      email: "jack@example.com",
      phone: "0793229970",
      gender: "Male",
      birthday: "28/11/1994",
      role: "User",
    },
    {
      email: "james@example.com",
      phone: "079322997",
      gender: "Male",
      birthday: "28/11/1994",
      role: "User",
    },
  ];

  const columns: Columns<TableData> = [
    {
      id: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      id: "phone",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      id: "gender",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      id: "birthday",
      title: "Birthday",
      dataIndex: "birthday",
    },
    {
      id: "role",
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <Container>
      <Content>
        <Section>
          <Button color="green" onClick={handleClick}>
            Change mode
          </Button>
          <Divider />

          {/* <Table<TableData> hasRowSelection dataSource={dataSource} columns={columns} /> */}

          <Form<Data>
            color="green"
            autoFocusValidation={false}
            initialData={intialValues}
            onFinish={handleFinish}
          >
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
