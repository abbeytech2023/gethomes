import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import styled from "styled-components";
import { Heading } from "./HeadingText";
import { useState } from "react";
import Carousel from "./Carousel";

const StyledTestimonial = styled.div`
  /* max-width: 100rem; */
  /* background-color: rgba(119, 119, 119, 0.137); */
  /* padding: 3rem 2rem; */

  height: 35rem;
  /* margin: 0 auto; */
  margin-top: 6rem;

  /* position: relative; */
  display: flex;
  /* justify-content: center; */

  /* IN THE END */
  overflow: hidden;
`;

const Slider = styled.div`
  width: 100rem;
  height: 50rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  background-color: yellow;
  /* IN THE END */
  /* overflow: hidden; */
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  background-color: blue;
  width: 100rem;
  height: 50rem;

  display: flex;
  align-items: center;
  justify-content: center;

  /* THIS creates the animation! */
  transition: transform 2s;
`;

// const Carousel = styled.div`
//   width: 800px;
//   background-color: #087f5b;
//   margin: 100px auto;
//   border-radius: 8px;
//   /* padding: 32px;
//         padding-left: 86px;
//         padding-right: 48px; */
//   padding: 32px 48px 32px 96px;
//   color: #fff;
//   display: flex;
//   align-items: center;
//   gap: 86px;
//   position: relative;
// `;

const ButtonRight = styled.button`
  background-color: red;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  position: absolute;
`;

const ButtonLeft = styled.button`
  background-color: blue;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const comments = [
  {
    author: "adebayo",
    id: "1",
    comment:
      "Exceptional service from start to finish! Our agent was knowledgeable, responsive, and went above and beyond to ensure we found our dream home. Highly recommend!",
  },
  {
    author: "remilekun",
    id: "2",
    comment:
      "Professional, friendly, and expert guidance throughout the entire process. Our agent's negotiation skills secured us an amazing deal. We couldn't be happier!",
  },
  {
    author: "adebimpe",
    id: "3",
    comment:
      "Seamless experience! Our agent's market expertise and attention to detail made selling our home stress-free. We received multiple offers and sold above asking price. Top-notch service!",
  },
  {
    author: "ogunmefun",
    id: "4",
    comment:
      "First-time homebuyers and our agent held our hands through every step. Patient, informative, and always available. We found our perfect home thanks to their dedication. Five stars isn't enough!",
  },
  {
    author: "abubakar",
    id: "5",
    comment:
      "Results-driven and passionate about their work! Our agent's negotiation skills and market knowledge got us the best price for our new home. Their support team was also fantastic. Highly recommend for all your real estate needs!",
  },
];

export default function Testimonials() {
  return (
    <div>
      <Carousel comments={comments} />;
    </div>
  );
}
