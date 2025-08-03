import { useState } from "react";
import { Button, Carousel } from "./components/UI";
import { CarouselItems } from "./components/UI/Carousel/type";

const { Gallery } = Carousel;

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const items: CarouselItems = [
    {
      id: "slide-1",
      url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrg&dpr=1",
    },
    {
      id: "slide-2",
      url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrg&dpr=1",
    },
    {
      id: "slide-3",
      url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrg&dpr=1",
    },
  ];

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}>Open gallery</Button>
      <Gallery open={open} items={items} slideId="carouselGallery" onClose={handleOpen} />
    </>
  );
};

export default App;
