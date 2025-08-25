import {
  CSSProperties,
  ReactNode,
  ForwardRefRenderFunction,
  useState,
  useEffect,
  forwardRef,
  useRef,
} from "react";
import { CarouselItems } from "./type";
import {
  HiOutlineChevronLeft as ArrowLeft,
  HiOutlineChevronRight as ArrowRight,
  HiXMark as IconClose,
  HiListBullet as IconList,
} from "react-icons/hi2";
import { Image } from "..";
import { useRender } from "@/hooks";
import Portal from "@/components/Portal";
import useCarousel from "./useCarousel";
import utils from "@/utils";

export interface CarouselGalleryProps {
  rootClassName?: string;
  style?: CSSProperties;
  items?: CarouselItems;
  slideId?: string;
  time?: number;
  open?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  prevButtonIcon?: ReactNode | ReactNode[];
  nextButtonIcon?: ReactNode | ReactNode[];
  mode?: "dark" | "light";
  onClose?: () => void;
}

let interval: any;

const CarouselGallery: ForwardRefRenderFunction<HTMLDivElement, CarouselGalleryProps> = (
  {
    rootClassName = "",
    style,
    slideId = "slide",
    mode = "dark",
    time = 3000,
    infinite,
    autoPlay,
    open = false,
    hasManualStop,
    prevButtonIcon = <ArrowLeft size={30} />,
    nextButtonIcon = <ArrowRight size={30} />,
    items = [
      {
        id: "1",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "2",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "3",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "4",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "5",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "6",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "7",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "8",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "9",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "10",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "11",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
      {
        id: "12",
        url: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
      },
    ],
    onClose,
  },
  ref
) => {
  const [showList, setShowList] = useState<boolean>(false);

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

  const render = useRender(open);

  useEffect(() => {
    if (autoPlay) {
      if (manualStop && !clicked && !touched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const modeClassName = `carousel-${mode}`;

  const openClassName = open ? "carousel-gallery-active" : "";

  const prevBtnDisabled = !isReSlide && slidePos === 0;

  const nextBtnDisabled = !isReSlide && slidePos === items.length - 1;

  const prevBtnDisabledClassName = prevBtnDisabled ? "carousel-action-disabled" : "";

  const nextBtnDisabledClassName = nextBtnDisabled ? "carousel-action-disabled" : "";

  const listActiveClassName = showList ? "carousel-gallery-list-active" : "";

  const mainClassName = utils.formatClassName(
    "carousel",
    "carousel-gallery",
    openClassName,
    listActiveClassName,
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
        <img src={item.url} className="item-content" />
      </div>
    ));
  };

  const renderList = () => {
    return items.map((item, idx) => {
      const itemActiveClassName = slidePos === idx ? "list-item-active" : "";
      return (
        <Image
          imgWidth="100%"
          key={item.id}
          src={item.url}
          rootClassName={`list-item ${itemActiveClassName}`}
          onClick={() => jumpToSlide(idx)}
        />
      );
    });
  };

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={mainClassName}>
          <div className="gallery-view">
            <button disabled={prevBtnDisabled} className={prevActionClassName} onClick={onPrev}>
              {prevButtonIcon}
            </button>
            <button disabled={nextBtnDisabled} className={nextActionClassName} onClick={onNext}>
              {nextButtonIcon}
            </button>

            <div className="view-head">
              <div className="head-content">
                {slidePos + 1} / {items.length}
              </div>
              <div className="head-action">
                <IconList size={20} className="action-icon" onClick={() => setShowList(!showList)} />
                <IconClose size={20} className="action-icon" onClick={onClose} />
              </div>
            </div>

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

          <div className="gallery-list">{renderList()}</div>
        </div>
      )}
    </Portal>
  );
};

export default forwardRef(CarouselGallery);
