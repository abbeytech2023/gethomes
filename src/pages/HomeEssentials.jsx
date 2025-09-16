import styled from "styled-components";
import { motion } from "framer-motion";
import { BgOverlay } from "../components/BgOverlay";
import { Heading } from "../components/HeadingText";
import Button from "../components/Button";
import {
  FlexDiv,
  FlexInnerDiv,
  StyledIconDiv,
  StyledLinkButton,
} from "../components/FlexDiv";
import { merchants } from "../components/Merchants";
import { useRef } from "react";

const HomeEssentialsSection = styled.div`
  height: 70vh;
  width: 100%;
  background-image: url(${"https://images.unsplash.com/photo-1639322132757-14ee19fb04f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const EssentialHeaderBox = styled.div`
  font-weight: 800;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
`;

//https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
// https://images.unsplash.com/photo-1639322132757-14ee19fb04f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
//https://plus.unsplash.com/premium_photo-1744390860279-0922ae1a2cad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
//https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

export default function HomeEssentials() {
  const merchantRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const handleScroll = () => {
    merchantRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className="flex items-center tracking-tight max-[767px]:bg-[#cce1f6] mt-[2rem] h-dvh ">
        <div className="flex flex-col xl:items-end justify-end min-[0px]:items-center sm:items-center  sm:w-[100%] ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="flex flex-col mr-3  gap-[2rem] w-[60%]  "
          >
            <EssentialHeaderBox className="uppercase text-4xl tracking-[-1rem]  ">
              Perfect your home
            </EssentialHeaderBox>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
              className=" text-[25px] sm:text-[20px]  mb-[1rem]"
            >
              Don&apos;t let home maintenance issues disrupt your life. Our
              experienced technicians are here to help. Book now and get a free
              consultation!
            </motion.p>

            <Button
              onClick={handleScroll}
              type="primary"
              className="text-[22px] block mr-12"
            >
              shop home essentials
            </Button>
          </motion.div>
        </div>

        <HomeEssentialsSection className="sm:hidden md:block  min-[0px]:hidden xl:block lg:block w-[80%]">
          <BgOverlay
            as="essentials"
            className="w-full h-full text-center"
          ></BgOverlay>
        </HomeEssentialsSection>
      </section>

      <section
        className="mt-[16rem] flex justify-center text-center py-16 "
        ref={merchantRef}
      >
        <FlexDiv>
          {merchants.map((merchant, index) => {
            return (
              <FlexInnerDiv key={index} className="">
                <div className="flex flex-col items-center justify-center gap-3 px-5 ">
                  <StyledIconDiv>
                    <img src={merchant.imgLink} />
                  </StyledIconDiv>
                  <Heading as="h5" className="text-2xl font-bold">
                    {merchant.craftGroup}
                  </Heading>
                  <p className="flex items-center text-left text-[18px] h-[13rem]">
                    {merchant.description}
                  </p>
                  <StyledLinkButton to={`/merchants/${merchant.craftsMenLink}`}>
                    {merchant.crafMenButton}
                  </StyledLinkButton>
                </div>
              </FlexInnerDiv>
            );
          })}
        </FlexDiv>
      </section>
    </>
  );
}
