import { useEffect } from "react";

const useAnchor = () => {
  const handleScroll = () => {
    const contents = document.querySelectorAll(".anchor-section");
    const menuItems = document.querySelectorAll(".anchor");
    contents.forEach((content: any) => {
      const scrollY = window.scrollY;
      const top = content.offsetTop - 150;
      const height = content.offsetHeight;
      if (scrollY > top && scrollY < top + height) {
        menuItems.forEach((menu) => {
          menu.classList.remove("anchor-active");
          if (content.id)
            document.querySelector(`.anchor[href*=${content.id}]`)?.classList.add("anchor-active");
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
};

export default useAnchor;
