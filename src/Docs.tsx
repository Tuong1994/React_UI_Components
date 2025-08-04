
import { Input, Select } from "./components/Control";
import { Image, Space, Table } from "./components/UI";
import { Columns } from "./components/UI/Table/type";

interface TableData {
  id: string;
  content: string;
  productName: string;
}

const App: React.FC = () => {
  const dataSource: TableData[] = [
    {
      id: "1",
      content: "This is a comment 1",
      productName: "Product 1",
    },
    {
      id: "2",
      content: "This is a comment 2",
      productName: "Product 2",
    },
    {
      id: "3",
      content: "This is a comment 3",
      productName: "Product 3",
    },
  ];

  const columns: Columns<TableData> = [
    {
      id: "id",
      dataIndex: "id",
      title: "Image",
      render: () => <Image imgWidth={50} imgHeight={50} />,
    },
    {
      id: "content",
      dataIndex: "content",
      title: "Content",
    },
    {
      id: "productName",
      dataIndex: "productName",
      title: "Product",
    },
  ];

  const tableFilter = (
    <Space>
      <Input sizes="sm" />
      <Select
        sizes="sm"
        options={[
          { label: "Item 1", value: 1 },
          { label: "Item 2", value: 2 },
          { label: "Item 3", value: 3 },
        ]}
      />
    </Space>
  );

  return (
    <Table<TableData>
      hasRowSelection
      hasFilter
      showRemove={false}
      filter={tableFilter}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default App;
