// Here's a simple carousel logic in React:
import "../index.css";

import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Heading } from "./HeadingText";
import {
  CarouselControl,
  CarouselIndicator,
  CarouselInner,
  CarouselItem,
  StyledCarousel,
} from "./CarouselStyles";

const Carousel = ({ comments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + comments.length) % comments.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
  };

  useEffect(() => {
    const intervalid = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 7000);

    return () => clearInterval(intervalid);
  }, [comments.length]);

  return (
    <StyledCarousel>
      <div className="">
        <Heading as="h2">OUR TESTMONALS</Heading>
      </div>
      <CarouselInner
        style={{
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        {comments &&
          comments.map((comment) => {
            return (
              <CarouselItem key={comment.id}>
                <div className="flex flex-col justify-center mb-10  items-center bg-[#071a25] text-[#fff] w-[100%] px-[3rem] py-16">
                  <p className="mb-8">{comment.comment}</p>
                  <p className="text-2xl font-semibold mb-9">
                    {comment.author}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
      </CarouselInner>
      <CarouselControl className="left-[0px]" onClick={goToPrevSlide}>
        <FaAngleLeft />
      </CarouselControl>
      <CarouselControl className="right-[0px]" onClick={goToNextSlide}>
        <FaAngleRight />
      </CarouselControl>
      <CarouselIndicator className="">
        {comments.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </CarouselIndicator>
    </StyledCarousel>
  );
};

export default Carousel;

// This carousel component has the following features:

// - Navigation buttons: Prev and Next buttons to manually change slides.
// - Indicators: Clickable indicators to navigate to specific slides.
// - Slide transition: Smooth transition between slides.
