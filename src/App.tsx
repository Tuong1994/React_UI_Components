import { UI, Control } from "@/components";
import { Columns } from "./components/UI/Table/type";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import useLayoutStore from "./components/UI/Layout/LayoutStore";
import "./style/main.scss";
import { FaUser } from "react-icons/fa";

const { Section, Button, Divider, Table, Layout } = UI;

const { Container, Head, Body, Side, Content, Menu } = Layout;

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

  const items: MenuItems = [
    {
      id: "1",
      label: "Menu 1",
      icon: <FaUser />,
      children: [
        {
          id: "child-1",
          label: "Menu child 1",
          children: [
            { id: "child-inner-1", label: "Menu child-inner 1" },
            { id: "child-inner-2", label: "Menu child-inner 2" },
            { id: "child-inner-3", label: "Menu child-inner 3" },
          ],
        },
        { id: "child-2", label: "Menu child 2" },
        { id: "child-3", label: "Menu child 3" },
      ],
    },
    { id: "2", label: "Menu 2", icon: <FaUser /> },
    { id: "3", label: "Menu 3", icon: <FaUser /> },
  ];

  return (
    <Container>
      <Head></Head>
      <Body>
        <Side collapsable>
          <Menu type="vertical" items={items} />
        </Side>
        <Content>
          <Section>
            <Button color="green" onClick={handleClick}>
              Change mode
            </Button>
            <Divider />

            <Table<TableData> hasRowSelection hasPagination dataSource={dataSource} columns={columns} />

            {/* <Form<Data>
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
          </Form> */}
          </Section>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
