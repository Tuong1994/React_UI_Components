import React from "react";
import { UI } from "@/components";
import "./style/main.scss";

const { Section, Modal, Button } = UI;

function App() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Section>
      <Button color="green" onClick={() => setOpen(true)}>
        Text
      </Button>

      <Modal open={open} onCancel={() => setOpen(false)}>
        
      </Modal>
    </Section>
  );
}

export default App;
