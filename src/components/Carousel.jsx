// Here's a simple carousel logic in React:

import "../index.css";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import styled from "styled-components";
import { Heading } from "./HeadingText";

const StyledCarousel = styled.div`
  position: relative;

  width: 80%;
  margin: 0 auto;
  /* height: 70vh; */
  overflow: hidden;
`;

const CarouselInner = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  /* gap: 2rem; */
  transition: transform 0.5s ease-in-out;
  /* position: relative; */
  /* overflow-x: hidden; */
`;

const CarouselItem = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 40vh; */

  text-align: center;
  flex-shrink: 0;
  /* overflow-x: hidden; */
`;

const CarouselControl = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%, 50%);
  font-size: 24px;
  cursor: pointer;
  color: #fff;

  border: none;
`;

const CarouselIndicator = styled.div`
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

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
      <div className="flex justify-center items-center text-center h-20">
        <Heading className="mb-10" as="h2">
          OUR TESTMONALS
        </Heading>
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
                  <p className="mb-9 font-semibold text-2xl">
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
