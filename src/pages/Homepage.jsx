import styled from "styled-components";
import Image from "../assets/images/Image-search.jpg";
import { BackgroundImage } from "../components/BackgroundImage";
import Testimonials from "../components/Testimonials";
import { Heading } from "../components/HeadingText";
import IconBuy from "../assets/images/illusale.jpg";
import IconSell from "../assets/images/hand-shake.jpg";
import IconRent from "../assets/images/see-through.jpg";
import IconSurvey from "../assets/images/illus.jpg";
import CompleteRegistrationPopup from "../components/CompleteRegistrationPopUp";
import { BgOverlay } from "../components/BgOverlay";
import { motion } from "framer-motion";

import {
  FlexDiv,
  FlexInnerDiv,
  StyledIconDiv,
  StyledLinkButton,
} from "../components/FlexDiv";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";

const Section = styled.section`
  color: blue;
  height: 100vh;
  background-image: url(${Image});

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
`;

const homePageCart = [
  {
    icon: `${IconSell}`,
    heading: "Buy A Home",
    description:
      " Find your dream home today! Expert guidance, endless options and  unbeatable prices your perfect haven awaits start searching now  and make it yours",
    linkButtonValue: "Homes For Sale",
    linkButton: "/buy",
  },
  {
    icon: `${IconBuy}`,
    heading: "Home essentials",
    description:
      "Keep Your Home Running Smoothly With Our Expert Maintainance Services, Your One-Stop Website For All Your Maintainance Needs ",
    linkButtonValue: "See our merchants",
    linkButton: "/homeessentials",
  },
  {
    icon: `${IconRent}`,
    heading: "Rent A Home",
    description:
      "Fully Furnished and Equipped, Rent our Properties Today! Perfect For Student, Ideal For Professionals, Family Friendly Property For Rent, Ideal For Those with Kids",
    linkButtonValue: "Find Rentals",
    linkButton: "/rent",
  },
  {
    icon: `${IconSurvey}`,
    heading: "Installment-Purchase",
    description:
      "Sell a home fast and stress free, get top payment with expert marketing global reach and personalized services, get a quote  today and sell with confidence",
    linkButtonValue: "See Your Options",
    linkButton: "",
  },
];

export default function Homepage() {
  const { user } = useUser();
  const id = user?.id;
  const { authenticatedUser } = useFetchUsersWithId(id);
  // console.log(authenticatedUser);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center text-center "
      >
        {user && <CompleteRegistrationPopup user={user} />}
        <div className=" w-[30%] sm:w-[100%] px-6    md:w-[100%] min-[0px]:bg-[#1c2535] min-[0px]:w-full gap-5 h-dvh flex flex-col justify-center items-left">
          <Heading
            as="h1"
            className="text-left font-extrabold  text-white mt-10    sm:text-white tracking-[4px] text-3xl "
          >
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="mb-6 text-3xl font-bold leading-relaxed md:text-5xl"
            >
              Connecting You to Properties, Artisans & Technicians. <br />
            </motion.h1>
          </Heading>
          <ul className="flex flex-col gap-4 text-[1.3rem] text-left text-white">
            <li className="">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 1, delay: 0.2 }}
                // className="max-w-3xl mx-auto text-lg md:text-xl"
              >
                Your trusted marketplace for real estate and skilled
                professionals.
              </motion.p>
            </li>
            <li className="">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 1, delay: 0.2 }}
                // className="max-w-3xl mx-auto text-lg md:text-xl"
              >
                Discover reliable service providers near you
              </motion.p>
            </li>
          </ul>
        </div>

        <BackgroundImage className="sm:hidden md:block  min-[0px]:hidden xl:block lg:block">
          <BgOverlay
            as="home"
            className="w-full h-full text-center"
          ></BgOverlay>
        </BackgroundImage>
      </motion.div>

      <section className="mt-[16rem] flex justify-center text-center py-16 ">
        {/* <Heading as="h5">Our Services</Heading> */}
        <FlexDiv className="">
          {homePageCart.map((cart) => {
            return (
              <>
                <FlexInnerDiv className="min-[0px]:mx-[3rem] xl:mx-0 lg:mx-0 md:mx-0 ">
                  <div className="flex flex-col items-center justify-center gap-6 ">
                    <StyledIconDiv className="flex items-center min-[0px]:h-[7rem] xl:h-[13rem] lg:h-[11rem] md:h-[8rem] sm:h-[7rem]">
                      <img src={cart.icon} />
                    </StyledIconDiv>
                    <Heading as="h5" className="text-2xl font-bold">
                      {cart.heading}
                    </Heading>
                    <p className="flex  text-[18px] h-[11rem] items-center text-left  px-5">
                      {cart.description}
                    </p>
                    <StyledLinkButton to={cart.linkButton}>
                      {cart.linkButtonValue}
                    </StyledLinkButton>
                  </div>
                </FlexInnerDiv>
              </>
            );
          })}
        </FlexDiv>
      </section>

      <section className="mt-[12rem]  ">
        <Testimonials />
      </section>

      <section className="px-6 py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose Us?</h2>
          <p className="mb-6 text-lg text-gray-800">
            We make it easy to access verified professionals and trusted
            property deals. Our platform brings transparency, trust, and
            convenience to your doorstep.
          </p>
          <button className="px-6 py-3 cursor-pointer text-white transition bg-[#144c6f] rounded-full shadow hover:bg-[#052031]">
            <Link to="/aboutus">Learn More</Link>
          </button>
        </div>
      </section>

      {/* <section className="flex flex-col text-center mt-16 justify-center items-center mx=auto  ">
        <h3 className="text-2xl font-black mb-7">
          About Gethomes Recommendations
        </h3>
        <p className="max-w-[40rem] text-left text-[1.3rem] max-[665px]:px-7">
          Disclaimer: The information provided on this website is for general
          informational purposes only and should not be considered professional
          advice. While we strive to provide accurate and up-to-date
          information, we make no representations or warranties of any kind,
          express or implied, about the completeness, accuracy, reliability,
          suitability, or availability of the information contained on this
          website. <br /> Any reliance you place on such information is strictly
          at your own risk. We are not responsible for any losses or damages
          that may arise from your use of this website or the information
          contained herein.
        </p>
        <h3 className="text-2xl mb-7 mt-[8rem] font-black">
          Investment and Trading Risks
        </h3>
        <p className="max-w-[40rem] text-[1.3rem] text-left max-[665px]:px-7">
          Trading and investing in [specific market or industry] carries
          significant risks, including the risk of losing principal. Past
          performance is not indicative of future results. Before making any
          investment or trading decisions, you should consult with a qualified
          financial advisor or conduct your own research. Property and Housing:
          The properties and houses listed on this website are subject to market
          fluctuations and other factors that may affect their value. We make no
          guarantees or representations about the accuracy or completeness of
          the information provided about these properties. Consult
          Professionals: Before making any decisions based on the information
          provided on this website, you should consult with qualified
          professionals, including financial advisors, lawyers, and real estate
          experts. By using this website, you acknowledge that you have read,
          understood, and agree to this disclaimer.
        </p>
      </section> */}
    </>
  );
}
