import React from "react";
import { UI, Control } from "@/components";
import { FormRule, SelectOptions } from "./components/Control/type";
import "./style/main.scss";

const { Section, Drawer, Button } = UI;

const { Upload } = Control;

const { SingleImageUpload } = Upload.Image;

function App() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Section>
      <Drawer open={open} onClose={() => setOpen(false)}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos perferendis atque quos, enim eaque ipsam
        dolores molestias maxime sit sint commodi nisi similique voluptatum eligendi rerum cum quasi, omnis
        natus sed aliquid illum aperiam nulla blanditiis non. Vel adipisci unde dolorem nisi iste
        necessitatibus impedit? Quidem magnam quae quisquam expedita eum, sit sint vitae temporibus rerum vero
        esse aliquam tempora libero incidunt nostrum et earum ex provident explicabo nobis ipsam facere! Autem
        tempora repellat consequatur porro suscipit vitae, nemo sequi iusto aliquid sed laborum adipisci nisi
        explicabo nulla quas quo numquam deserunt. Vel veritatis omnis sint id amet consequatur earum quidem
        unde. Perferendis similique, cum repudiandae amet ad porro pariatur quis cupiditate tempore earum
        doloremque sed provident quibusdam iusto corporis culpa magni necessitatibus et minus. Odio voluptate
        quas nulla voluptatum nesciunt labore nobis recusandae dolore sapiente minus? Odit placeat error
        laboriosam. Iste, id. Nisi dolores consectetur maiores. Molestias, totam repellat neque inventore cum
        adipisci nihil? Sit eveniet, laudantium beatae veritatis placeat provident voluptate commodi
        quibusdam, quasi cupiditate eum debitis ipsum reprehenderit exercitationem quos, perferendis molestiae
        culpa ex officia tempora earum dignissimos laborum saepe ratione. Quasi iure voluptas, minus maxime
        aliquid magni qui dolor perferendis voluptate deserunt veniam dicta deleniti quaerat.
      </Drawer>

      <Button onClick={() => setOpen(true)}>Button</Button>
    </Section>
  );
}

export default App;
