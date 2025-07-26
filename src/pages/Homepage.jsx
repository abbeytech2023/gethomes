import styled from "styled-components";
import Image from "../assets/images/Image-search.jpg";
import { BackgroundImage } from "../components/BackgroundImage";
import Testimonials from "../components/Testimonials";
import { Heading } from "../components/HeadingText";
import IconBuy from "../assets/images/illusale.jpg";
import IconSell from "../assets/images/hand-shake.jpg";
import IconRent from "../assets/images/see-through.jpg";
import IconSurvey from "../assets/images/illus.jpg";
import { BgOverlay } from "../components/BgOverlay";
import {
  FlexDiv,
  FlexInnerDiv,
  StyledIconDiv,
  StyledLinkButton,
} from "../components/FlexDiv";

import { Link } from "react-router-dom";

const Section = styled.section`
  color: blue;
  height: 100vh;
  background-image: url(${Image});

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
`;

export default function Homepage() {
  return (
    <>
      <div className="flex justify-center items-center text-center ">
        <div className=" w-[30%] sm:w-[100%] px-6    md:w-[100%] min-[0px]:bg-[#1c2535] min-[0px]:w-full gap-5 h-dvh flex flex-col justify-center items-left">
          <Heading
            as="h1"
            className="text-left font-extrabold  text-white    sm:text-white tracking-[4px] text-3xl "
          >
            The Ultimate Neighborhood Guide. <br />
          </Heading>
          <ul className="text-white flex flex-col gap-4 text-left">
            <li className="text-2xl"> Discover the Best Places to Live</li>
            <li className="text-2xl">
              Discover reliable service providers near you
            </li>
          </ul>
        </div>

        <BackgroundImage className="sm:hidden md:block  min-[0px]:hidden xl:block lg:block">
          <BgOverlay
            as="home"
            className="w-full h-full text-center"
          ></BgOverlay>
        </BackgroundImage>
      </div>

      <section className="mt-[16rem] flex justify-center text-center py-16 ">
        {/* <Heading as="h5">Our Services</Heading> */}
        <FlexDiv className="">
          <FlexInnerDiv className="min-[0px]:mx-[3rem] xl:mx-0 lg:mx-0 md:mx-0 ">
            <div className=" flex flex-col items-center justify-center gap-3">
              <StyledIconDiv className="flex items-center min-[0px]:h-[7rem] xl:h-[13rem] lg:h-[11rem] md:h-[8rem] sm:h-[7rem]">
                <img src={`${IconSell}`} />
              </StyledIconDiv>
              <Heading as="h5" className="font-bold text-2xl">
                Buy A Home
              </Heading>
              <p className="text-[18px]  px-5">
                Find your dream home today! Expert guidance, endless options and
                unbeatable prices your perfect haven awaits start searching now
                and make it yours
              </p>
              <StyledLinkButton to="/findanagent">
                Find a local agent
              </StyledLinkButton>
            </div>
          </FlexInnerDiv>
          <FlexInnerDiv className="min-[0px]:mx-[3rem] xl:mx-0 lg:mx-0 md:mx-0 ">
            <div className=" flex flex-col items-center justify-center gap-3">
              <StyledIconDiv className="flex items-center min-[0px]:h-[7rem] xl:h-[15rem] lg:h-[12rem] md:h-[8rem] sm:h-[7rem]">
                <img src={`${IconBuy}`} />
              </StyledIconDiv>
              <Heading as="h5" className="font-bold text-2xl">
                Home essentials
              </Heading>
              <p className="text-[18px]  px-5">
                Sell a home fast and stress free, get top payment with expert
                marketing global reach and personalized services, get a quote
                today and sell with confidence
              </p>
              <StyledLinkButton to="/homeessentials">
                See our merchants
              </StyledLinkButton>
            </div>
          </FlexInnerDiv>
          <FlexInnerDiv className="min-[0px]:mx-[3rem] xl:mx-0 lg:mx-0 md:mx-0 ">
            <div className=" flex flex-col items-center justify-center gap-3">
              <StyledIconDiv className="flex items-center min-[0px]:h-[7rem] xl:h-[15rem] lg:h-[12rem] md:h-[8rem] sm:h-[7rem]">
                <img src={`${IconRent}`} />
              </StyledIconDiv>
              <Heading Heading as="h5" className="font-bold text-2xl">
                Rent A Home
              </Heading>
              <p className="text-[18px] px-5">
                Rent your dream home today! Luxury, comfort, and convenience -
                explore top listings and find your perfect space with ease and
                simplicity.
              </p>
              <StyledLinkButton to="/rent">Find Rentals</StyledLinkButton>
            </div>
          </FlexInnerDiv>
          <FlexInnerDiv className="min-[0px]:mx-[3rem] xl:mx-0 lg:mx-0 md:mx-0 ">
            <div className=" flex flex-col items-center justify-center gap-3">
              <StyledIconDiv className="flex items-center min-[0px]:h-[7rem] xl:h-[15rem] lg:h-[12rem] md:h-[8rem] sm:h-[7rem]">
                <img src={`${IconSurvey}`} />
              </StyledIconDiv>
              <Heading Heading as="h5" className="font-bold text-2xl">
                Installment purchase
              </Heading>
              <p className="text-[18px] px-5">
                Accurate land surveys, precise results. Trust our experts for
                boundary mapping, topographic surveys, and more. Reliable data
                for your property decisions.
              </p>
              <StyledLinkButton to="/rent" className="min-[0px]:mx-[2rem]">
                See your options{" "}
              </StyledLinkButton>
            </div>
          </FlexInnerDiv>
        </FlexDiv>
      </section>
      <section className="mt-[12rem]  ">
        <Testimonials />
      </section>
    </>
  );
}
