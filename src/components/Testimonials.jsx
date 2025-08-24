import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import styled from "styled-components";

import Carousel from "./Carousel";

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
