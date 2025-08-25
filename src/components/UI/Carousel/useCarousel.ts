import { MutableRefObject, TouchEvent, MouseEvent, useState } from "react";

type TranslateType = "horizontal" | "vertical";

type Params = {
  time?: number;
  isReSlide?: boolean;
  hasManualStop?: boolean;
  slidePos?: number;
  translateType?: TranslateType;
  containerRef?: MutableRefObject<HTMLDivElement | null>;
  slideRefs: MutableRefObject<HTMLDivElement[]>;
};

let interval: any;

const useCarousel = (args: Params) => {
  const { time, isReSlide, hasManualStop, translateType = "horizontal", containerRef, slideRefs } = args;

  const [slidePos, setSlidePos] = useState<number>(0);

  const [touchStartPos, setTouchStartPos] = useState<number>(0);
  const [touchEndPos, setTouchEndPos] = useState<number>(0);
  const [touched, setTouched] = useState<boolean>(false);
  const [touchSwiped, setTouchSwiped] = useState<boolean>(false);

  const [mouseStartPos, setMouseStartPos] = useState<number>(0);
  const [mouseEndPos, setMouseEndPos] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const [mouseSwiped, setMouseSwiped] = useState<boolean>(false);

  const [manualStop, setManualStop] = useState<boolean>(time !== undefined);

  const span = 100;

  const isHorizontal = translateType === 'horizontal'

  const items: HTMLDivElement[] = slideRefs.current ? slideRefs.current : [];

  const translateFull = (pos: number, type: TranslateType) => {
    const translate = -pos * span;
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
    items.forEach((item) => {
      if (item) {
        if (type === "horizontal") item.style.transform = `translateX(${translate}%)`;
        else item.style.transform = `translateY(${translate}%)`;
      }
    });
  };

  const translateAnimation = (type: "fast" | "slow") => {
    for (let i = Math.max(0, slidePos - 2); i < Math.min(items.length, slidePos + 3); i++) {
      const el = items[i];
      if (el) {
        if (type === "fast") el.style.transitionDuration = `0.1s`;
        else el.style.transitionDuration = `0.4s`;
      }
    }
  };

  const handlePrevSlide = () => {
    let newPos = slidePos;
    if (newPos > 0) newPos -= 1;
    else if (isReSlide) newPos = items.length - 1;
    setSlidePos(newPos);
    translateFull(newPos, translateType);
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (isReSlide) newPos = 0;
    setSlidePos(newPos);
    translateFull(newPos, translateType);
  };

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFull(pos, translateType);
  };

  const handleManualStop = () => {
    clearInterval(interval);
    if (hasManualStop) setManualStop(false);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const eventTouch = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY
    setTouchStartPos(eventTouch);
    setTouchEndPos(eventTouch);
    setTouched(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touched) return;
    if (!containerRef?.current) return;
    const eventTouch = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY
    setTouchEndPos(eventTouch);
    const viewWidth = containerRef?.current.offsetWidth;
    if (viewWidth) {
      const translate = ((touchEndPos - touchStartPos) / viewWidth) * span;
      translatePartial(translate, translateType);
      setTouchSwiped(true);
    }
  };

  const onTouchEnd = () => {
    if (!touchSwiped) return;
    if (touchEndPos - touchStartPos > 75) handlePrevSlide();
    else if (touchEndPos - touchStartPos < -75) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setTouched(false);
    setTouchSwiped(false);
    translateAnimation("slow");
  };

  const onMouseStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const eventMouse = isHorizontal ? e.clientX : e.clientY
    setMouseStartPos(eventMouse);
    setMouseEndPos(eventMouse);
    setClicked(true);
    translateAnimation("fast");
    handleManualStop();
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!clicked) return;
    if (!containerRef?.current) return;
    const eventMouse = isHorizontal ? e.clientX : e.clientY
    setMouseEndPos(eventMouse);
    const viewWidth = containerRef?.current.offsetWidth;
    if (viewWidth) {
      const translate = ((mouseEndPos - mouseStartPos) / viewWidth) * span;
      translatePartial(translate, translateType);
      setMouseSwiped(true);
    }
  };

  const onMouseEnd = () => {
    if (!mouseSwiped) return;
    if (mouseEndPos - mouseStartPos > 100) handlePrevSlide();
    else if (mouseEndPos - mouseStartPos < -100) handleNextSlide();
    else jumpToSlide(slidePos);
    setManualStop(true);
    setClicked(false);
    setMouseSwiped(false);
    translateAnimation("slow");
  };

  return {
    manualStop,
    slidePos,
    clicked,
    touched,
    translateFull,
    translatePartial,
    translateAnimation,
    handlePrevSlide,
    handleNextSlide,
    handleManualStop,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseStart,
    onMouseMove,
    onMouseEnd,
    jumpToSlide,
  };
};

export default useCarousel;
