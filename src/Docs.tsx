import { useState } from "react";
import { Modal, Button, Space } from "./components/UI";
import { ComponentSize } from "./common/type";
import { ButtonSize } from "./components/UI/Button/type";

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [modalSize, setModalSize] = useState<ComponentSize>("md");

  const sizes: ButtonSize[] = ["sm", "md", "lg"];

  const handleTrigger = (size?: ButtonSize) => {
    if (size) setModalSize(size);
    setOpen(!open);
  };

  return (
    <>
      <Space>
        {sizes.map((size) => (
          <Button key={size} sizes={size} onClick={() => handleTrigger(size)}>
            Click me
          </Button>
        ))}
      </Space>
      <Modal sizes={modalSize} open={open} onCancel={handleTrigger}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita provident aliquam placeat
        repudiandae maiores porro cupiditate doloremque libero nam? Corrupti, dolores libero aliquam magnam
        quas aspernatur cumque error provident laborum cupiditate accusamus veniam, incidunt blanditiis sint
        possimus itaque aut sed atque? Asperiores saepe animi aspernatur impedit illum harum minima corporis
        earum fugiat eveniet velit, officia, quaerat facere voluptatem, laboriosam iure nobis quo nesciunt
      </Modal>
    </>
  );
};

export default App;
