import { Space, Avatar, Image } from "./components/UI";

const size = 50;

const App: React.FC = () => {
  return (
    <>
      <Space>
        <Avatar size={size} />
        <Avatar size={size} letter="T" />
        <Avatar size={size}>
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&dpr=1"
          />
        </Avatar>
      </Space>
    </>
  );
};

export default App;
