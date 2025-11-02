import { DynamicGrid, Divider, Image } from "./components/UI";
import { DynamicGridItems } from "./components/UI/DynamicGrid/type";

const App: React.FC = () => {
  const items: DynamicGridItems = [
    { id: "1", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "2", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "3", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "4", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "5", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "6", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "7", node: <Image imgWidth="100%" imgHeight="100%" /> },
    { id: "8", node: <Image imgWidth="100%" imgHeight="100%" /> },
  ];

  return (
    <>
      <Divider>One item</Divider>
      <DynamicGrid style={{ width: "300px" }} items={items.slice(0, 1)} />
      <Divider>Two items</Divider>
      <DynamicGrid style={{ width: "300px" }} items={items.slice(0, 2)} />
      <Divider>Three items</Divider>
      <DynamicGrid style={{ width: "300px" }} items={items.slice(0, 3)} />
      <Divider>Four items</Divider>
      <DynamicGrid style={{ width: "300px" }} items={items.slice(0, 4)} />
      <Divider>Five items and more</Divider>
      <DynamicGrid style={{ width: "300px" }} items={items} />
    </>
  );
};

export default App;
