import { Divider, Loading } from "./components/UI";

const { Skeleton } = Loading;

const App: React.FC = () => {
  return (
    <>
      <Divider>Title</Divider>
      <Skeleton type="title" />
      <Divider>Paragraph</Divider>
      <Skeleton type="paragraph" />
      <Divider>Image</Divider>
      <Skeleton type="image" options={{ size: 100 }} />
      <Divider>Button</Divider>
      <Skeleton type="button" />
    </>
  );
};

export default App;
