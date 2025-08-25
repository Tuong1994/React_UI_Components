import { MutableRefObject } from "react";

type TranslateType = "horizontal" | "vertical";

type Params = {
  slidePos: number;
  slideRefs: MutableRefObject<HTMLDivElement[]>;
};

const useCarousel = (args: Params) => {
  const { slidePos, slideRefs } = args;

  const span = 100;

  const translateFull = (pos: number, type: TranslateType) => {
    const translate = -pos * span;
    const items: HTMLDivElement[] = slideRefs.current ? slideRefs.current : [];
    items.forEach((item) => {
      if (item) {
        if (type === "horizontal") item.style.transform = `translateX(${translate}%)`;
        else item.style.transform = `translateY(${translate}%)`;
      }
    });
  };

  const translatePartial = (pos: number, type: TranslateType) => {
    const currentPos = -slidePos * span;
    const translate = currentPos + pos;
    const items: HTMLDivElement[] = slideRefs.current ? slideRefs.current : [];
    items.forEach((item) => {
      if (item) {
        if (type === "horizontal") item.style.transform = `translateX(${translate}%)`;
        else item.style.transform = `translateY(${translate}%)`;
      }
    });
  };

  const translateAnimation = (type: "fast" | "slow") => {
    const items: HTMLDivElement[] = slideRefs.current ? slideRefs.current : [];
    for (let i = Math.max(0, slidePos - 2); i < Math.min(items.length, slidePos + 3); i++) {
      const el = items[i];
      if (el) {
        if (type === "fast") el.style.transitionDuration = `0.1s`;
        else el.style.transitionDuration = `0.4s`;
      }
    }
  };

  return { translateFull, translatePartial, translateAnimation };
};

export default useCarousel;
