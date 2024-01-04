import { UI } from "@/components";
import "./style/main.scss";
import { MenuItems } from "./components/UI/Layout/Menu/type";
import { HiUser } from "react-icons/hi2";

const { Layout } = UI;

const { Container, Head, Body, Side, Content, Menu } = Layout;

function App() {
  const items: MenuItems = [
    {
      id: "1",
      label: "Menu 1",
      icon: <HiUser />,
      isRoot: true,
      children: [
        { id: "1", label: "Menu 1", icon: <HiUser /> },
        { id: "2", label: "Menu 2", icon: <HiUser /> },
        { id: "3", label: "Menu 3", icon: <HiUser /> },
        { id: "4", label: "Menu 4", icon: <HiUser /> },
        { id: "5", label: "Menu 5", icon: <HiUser /> },
        { id: "7", label: "Menu 7", icon: <HiUser /> },
      ],
    },
    { id: "2", label: "Menu 2", icon: <HiUser />, isRoot: true },
    { id: "3", label: "Menu 3", icon: <HiUser />, isRoot: true },
    { id: "4", label: "Menu 4", icon: <HiUser />, isRoot: true },
    { id: "5", label: "Menu 5", icon: <HiUser />, isRoot: true },
    { id: "6", label: "Menu 6", icon: <HiUser />, isRoot: true },
    { id: "7", label: "Menu 7", icon: <HiUser />, isRoot: true },
    { id: "8", label: "Menu 8", icon: <HiUser />, isRoot: true },
    { id: "9", label: "Menu 9", icon: <HiUser />, isRoot: true },
  ];

  return (
    <Container>
      <Head></Head>
      <Body>
        <Side collapsable>
          <Menu type="vertical" items={items} />
        </Side>
        <Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus provident, blanditiis nam rerum
          cum nemo ad laborum quos culpa nostrum, dolores placeat veritatis aut. Reiciendis excepturi maiores
          harum mollitia maxime, qui nihil rerum possimus ex dolores! Consequuntur dicta nam eius tenetur
          neque. Officiis aspernatur, nobis sed, dolor vitae delectus non odio quisquam modi recusandae
          quaerat architecto sequi incidunt distinctio maiores aut odit ea quo. Facere earum hic mollitia
          facilis sint, modi ut nulla dolor. Qui voluptatum est molestias amet obcaecati provident veniam
          error. Quibusdam maxime omnis tenetur eligendi consequuntur nostrum voluptate quaerat aperiam neque
          illo ea, natus officiis earum delectus et minus repellendus qui excepturi aut nobis corporis saepe
          sequi nihil quasi. Totam dignissimos reprehenderit dolores necessitatibus distinctio fugit
          voluptatibus animi nobis culpa provident. Fugit vel incidunt cumque odit, soluta, animi porro
          accusantium sequi sed libero suscipit ducimus? Explicabo architecto aliquid voluptatibus quisquam
          veritatis blanditiis, autem consequuntur numquam quae, pariatur minima animi qui nesciunt!
          Voluptatem quae porro nobis rem, illo earum architecto exercitationem temporibus obcaecati!
          Consequatur at voluptates iusto quo illum autem quaerat, dolore necessitatibus sit animi repellendus
          totam et corporis alias ipsa quidem! Fuga repellendus quo corrupti, perspiciatis saepe velit,
          nostrum ullam est sunt, eligendi magni dicta dolor enim? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Temporibus provident, blanditiis nam rerum cum nemo ad laborum quos culpa nostrum,
          dolores placeat veritatis aut. Reiciendis excepturi maiores harum mollitia maxime, qui nihil rerum
          possimus ex dolores! Consequuntur dicta nam eius tenetur neque. Officiis aspernatur, nobis sed,
          dolor vitae delectus non odio quisquam modi recusandae quaerat architecto sequi incidunt distinctio
          maiores aut odit ea quo. Facere earum hic mollitia facilis sint, modi ut nulla dolor. Qui voluptatum
          est molestias amet obcaecati provident veniam error. Quibusdam maxime omnis tenetur eligendi
          consequuntur nostrum voluptate quaerat aperiam neque illo ea, natus officiis earum delectus et minus
          repellendus qui excepturi aut nobis corporis saepe sequi nihil quasi. Totam dignissimos
          reprehenderit dolores necessitatibus distinctio fugit voluptatibus animi nobis culpa provident.
          Fugit vel incidunt cumque odit, soluta, animi porro accusantium sequi sed libero suscipit ducimus?
          Explicabo architecto aliquid voluptatibus quisquam veritatis blanditiis, autem consequuntur numquam
          quae, pariatur minima animi qui nesciunt! Voluptatem quae porro nobis rem, illo earum architecto
          exercitationem temporibus obcaecati! Consequatur at voluptates iusto quo illum autem quaerat, dolore
          necessitatibus sit animi repellendus totam et corporis alias ipsa quidem! Fuga repellendus quo
          corrupti, perspiciatis saepe velit, nostrum ullam est sunt, eligendi magni dicta dolor enim? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Temporibus provident, blanditiis nam rerum cum
          nemo ad laborum quos culpa nostrum, dolores placeat veritatis aut. Reiciendis excepturi maiores
          harum mollitia maxime, qui nihil rerum possimus ex dolores! Consequuntur dicta nam eius tenetur
          neque. Officiis aspernatur, nobis sed, dolor vitae delectus non odio quisquam modi recusandae
          quaerat architecto sequi incidunt distinctio maiores aut odit ea quo. Facere earum hic mollitia
          facilis sint, modi ut nulla dolor. Qui voluptatum est molestias amet obcaecati provident veniam
          error. Quibusdam maxime omnis tenetur eligendi consequuntur nostrum voluptate quaerat aperiam neque
          illo ea, natus officiis earum delectus et minus repellendus qui excepturi aut nobis corporis saepe
          sequi nihil quasi. Totam dignissimos reprehenderit dolores necessitatibus distinctio fugit
          voluptatibus animi nobis culpa provident. Fugit vel incidunt cumque odit, soluta, animi porro
          accusantium sequi sed libero suscipit ducimus? Explicabo architecto aliquid voluptatibus quisquam
          veritatis blanditiis, autem consequuntur numquam quae, pariatur minima animi qui nesciunt!
          Voluptatem quae porro nobis rem, illo earum architecto exercitationem temporibus obcaecati!
          Consequatur at voluptates iusto quo illum autem quaerat, dolore necessitatibus sit animi repellendus
          totam et corporis alias ipsa quidem! Fuga repellendus quo corrupti, perspiciatis saepe velit,
          nostrum ullam est sunt, eligendi magni dicta dolor enim?
        </Content>
      </Body>
    </Container>
  );
}

export default App;
