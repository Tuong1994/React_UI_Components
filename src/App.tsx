import React from "react";
import { UI } from "@/components";
import "./style/main.scss";
import { Columns } from "./components/UI/Table";

const { Section, Table } = UI;

interface Data {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function App() {
  const dataSource: Data[] = [
    { id: "1", name: "Jack", email: "jack@example.com", phone: "0793229970" },
    { id: "2", name: "Jack", email: "jack@example.com", phone: "0793229970" },
    { id: "3", name: "Jack", email: "jack@example.com", phone: "0793229970" },
  ];

  const columns: Columns<Data> = [
    {
      id: "name",
      title: "Name",
      dataIndex: "name",
    },
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
  ];

  return (
    <Section>
      <Table<Data>
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
      />
    </Section>
  );
}

export default App;
