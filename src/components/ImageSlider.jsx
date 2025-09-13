import { useState } from "react";
import styled from "styled-components";
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

const SliderInner = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  width: 100%;
  align-items: center;
  /* gap: 2rem; */
  transition: transform 0.5s ease-in-out;
  /* position: relative; */
  /* overflow-x: hidden; */
`;

const SliderItem = styled.div`
  display: flex;

  align-items: start;
  justify-content: center;
  width: 100%;
  height: 40vh;
  /* background-color: red; */

  text-align: center;
  flex-shrink: 0;
  /* overflow-x: hidden; */
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
      <StyledSliderContainer>
        <SliderInner
          style={{
            transform: `translateX(${-currentIndex * 100}%)`,
          }}
        >
          <SliderItem>
            <div className="flex flex-col justify-center items-center  text-[#fff] w-[100%] ">
              {/* <div> */}
              <img src={images} />
            </div>
          </SliderItem>
          <SliderItem>
            <div>
              {/* <div className="flex flex-col justify-center mb-10  items-center bg-[#071a25] text-[#fff] w-[100%] px-[3rem] py-16"> */}
              <iframe
                width="300"
                height="265"
                src={video}
                title="YouTube video player"
                // frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // referrerpolicy="strict-origin-when-cross-origin"
                // allowfullscreen
              ></iframe>
            </div>
          </SliderItem>
        </SliderInner>

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
