import { useState } from "react";
import styled from "styled-components";
import { CarouselInner, CarouselItem } from "./CarouselStyles";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const StyledSliderContainer = styled.div`
  position: relative;
  width: 70%;
  overflow: hidden;
`;

const ButtonControlLeft = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  border: none;
`;

const ButtonControlRight = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  border: none;
`;

export const ImageSlider = ({ images, video }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  return (
    <>
      <img src="" />

      <StyledSliderContainer>
        <CarouselInner
          style={{
            transform: `translateX(${-currentIndex * 100}%)`,
          }}
        >
          <CarouselItem>
            <div className="min-[0px]:w-[100%] px-7 xl:w-[100%] flex justify-center ">
              <img src={images} height="100px" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex items-center justify-center ">
              <iframe
                width="400"
                height="265"
                src={video}
                title="YouTube video player"
                // frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // referrerpolicy="strict-origin-when-cross-origin"
                // allowfullscreen
              ></iframe>
            </div>
          </CarouselItem>
        </CarouselInner>
        {/* <img
        src={images[currentIndex]}
        alt="Slide"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      /> */}
        <ButtonControlLeft onClick={handlePrevClick}>
          <FaAngleLeft />
        </ButtonControlLeft>
        <ButtonControlRight onClick={handleNextClick}>
          <FaAngleRight />
        </ButtonControlRight>
      </StyledSliderContainer>
    </>
  );
};
