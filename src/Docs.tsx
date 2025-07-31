import { Button, Dropdown } from "./components/UI";
import { DropdownItems } from "./components/UI/Dropdown/type";

const Docs: React.FC = () => {
  const items: DropdownItems = [
    { id: "item-1", label: "Item 1" },
    { id: "item-2", label: "Item 2" },
    { id: "item-3", label: "Item 3" },
  ];

  return (
    <>
      <Dropdown items={items} trigger="click">
        <Button>Click to dropdown</Button>
      </Dropdown>
      <Dropdown items={items} trigger="hover">
        <Button>Hover to dropdown</Button>
      </Dropdown>
    </>
  );
};

export default Docs;
