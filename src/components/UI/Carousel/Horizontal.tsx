import { CSSProperties, ReactNode, ForwardRefRenderFunction, useEffect, forwardRef, useRef } from "react";
import { CarouselItems } from "./type";
import { HiOutlineChevronLeft as ArrowLeft, HiOutlineChevronRight as ArrowRight } from "react-icons/hi2";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselHorizontalProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasArrow?: boolean;
  hasManualStop?: boolean;
  prevButtonIcon?: ReactNode | ReactNode[];
  nextButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
}

let interval: any;

const CarouselHorizontal: ForwardRefRenderFunction<HTMLDivElement, CarouselHorizontalProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasManualStop,
    hasArrow = true,
    prevButtonIcon = <ArrowLeft size={30} />,
    nextButtonIcon = <ArrowRight size={30} />,
    items = [
      { id: "1", content: "Content 1" },
      { id: "2", content: "Content 2" },
      { id: "3", content: "Content 3" },
    ],
  },
  ref
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slideRefs = useRef<HTMLDivElement[]>([]);

  const isReSlide = infinite || autoPlay;

  const {
    slidePos,
    manualStop,
    clicked,
    touched,
    handleManualStop,
    handleNextSlide,
    handlePrevSlide,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseStart,
    onMouseMove,
    onMouseEnd,
    jumpToSlide,
  } = useCarousel({
    time,
    isReSlide,
    hasManualStop,
    containerRef,
    slideRefs,
    translateType: "horizontal",
  });

  useEffect(() => {
    if (autoPlay) {
      if (manualStop && !clicked && !touched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const modeClassName = `carousel-${mode}`;

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const mainClassName = utils.formatClassName(
    "carousel",
    "carousel-horizontal",
    modeClassName,
    rootClassName
  );

  const prevActionClassName = utils.formatClassName("carousel-action", prevBtnDisabledClassName);

  const nextActionClassName = utils.formatClassName("carousel-action", nextBtnDisabledClassName);

  const onPrev = () => {
    handlePrevSlide();
    handleManualStop();
  };

  const onNext = () => {
    handleNextSlide();
    handleManualStop();
  };

  const renderItems = () => {
    return items.map((item, idx) => (
      <div
        key={item.id}
        id={`${slideId}-${idx}`}
        ref={(el: HTMLDivElement) => (slideRefs.current[idx] = el)}
        className="view-item"
      >
        {item.content}
      </div>
    ));
  };

  const renderDots = () => {
    return items.map((item, idx) => {
      const dotActiveClassName = slidePos === idx ? "dots-item-active" : "";
      return (
        <div
          key={item.id}
          className={utils.formatClassName("dots-item", dotActiveClassName)}
          onClick={() => jumpToSlide(idx)}
        />
      );
    });
  };

  return (
    <div ref={ref} style={style} className={mainClassName}>
      {hasArrow && (
        <button disabled={prevBtnDisabled} className={prevActionClassName} onClick={onPrev}>
          {prevButtonIcon}
        </button>
      )}
      {hasArrow && (
        <button disabled={nextBtnDisabled} className={nextActionClassName} onClick={onNext}>
          {nextButtonIcon}
        </button>
      )}
      <div
        ref={containerRef}
        className="carousel-view"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseStart}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
      >
        {renderItems()}
      </div>
      <div className="carousel-dots">{renderDots()}</div>
    </div>
  );
};

export default forwardRef(CarouselHorizontal);
