import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { CarouselItems } from "./type";
import {
  HiOutlineChevronLeft as ArrowLeft,
  HiOutlineChevronRight as ArrowRight,
  HiListBullet as List,
} from "react-icons/hi2";
import { useRender, useClickOutside } from "@/hooks";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselProductProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  prevButtonIcon?: ReactNode | ReactNode[];
  nextButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
}

let interval: any;

const CarouselProduct: ForwardRefRenderFunction<HTMLDivElement, CarouselProductProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    hasManualStop,
    prevButtonIcon = <ArrowLeft size={30} />,
    nextButtonIcon = <ArrowRight size={30} />,
    items = [
      { id: "1", content: "Content 1" },
      { id: "2", content: "Content 2" },
      { id: "3", content: "Content 3" },
      { id: "4", content: "Content 4" },
      { id: "5", content: "Content 5" },
    ],
  },
  ref
) => {
  const [showList, setShowList] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);

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

  const render = useRender(showList);

  useClickOutside(listRef, setShowList);

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

  const showListClassName = showList ? "responsive-list-active" : "";

  const mainClassName = utils.formatClassName("carousel", "carousel-product", modeClassName, rootClassName);

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

  const renderList = () => {
    return items.map((item, idx) => {
      const itemActiveClassName = slidePos === idx ? "list-item-active" : "";
      return (
        <div
          key={item.id}
          className={utils.formatClassName("list-item", itemActiveClassName)}
          onClick={() => jumpToSlide(idx)}
        >
          {item.content}
        </div>
      );
    });
  };

  return (
    <div ref={ref} style={style} className={mainClassName}>
      <div className="product-list">{renderList()}</div>

      <div className="product-view">
        <button disabled={prevBtnDisabled} className={prevActionClassName} onClick={onPrev}>
          {prevButtonIcon}
        </button>
        <button disabled={nextBtnDisabled} className={nextActionClassName} onClick={onNext}>
          {nextButtonIcon}
        </button>
        <div className="view-slide">
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
        </div>
      </div>

      <div ref={listRef} className="product-list-responsive">
        <div className="responsive-label" onClick={() => setShowList(!showList)}>
          <List size={20} />
        </div>
        {render && (
          <div className={utils.formatClassName("responsive-list", showListClassName)}>{renderList()}</div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(CarouselProduct);
