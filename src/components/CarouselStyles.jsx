import styled from "styled-components";

export const StyledCarousel = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  /* height: 70vh; */
  overflow: hidden;
`;

export const CarouselInner = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  /* gap: 2rem; */
  transition: transform 0.5s ease-in-out;
  /* position: relative; */
  /* overflow-x: hidden; */
`;

export const CarouselItem = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 40vh; */

  text-align: center;
  flex-shrink: 0;
  /* overflow-x: hidden; */
`;

export const CarouselControl = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%, 50%);
  font-size: 24px;
  cursor: pointer;
  color: #fff;

  border: none;
`;

export const CarouselIndicator = styled.div`
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;
