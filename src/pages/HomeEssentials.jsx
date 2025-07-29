import styled from "styled-components";
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

const HomeEssentialsSection = styled.div`
  height: 70vh;
  width: 100%;
  background-image: url(${"https://images.unsplash.com/photo-1639322132757-14ee19fb04f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const EssentialHeaderBox = styled.div`
  font-weight: 900;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
`;

//https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
// https://images.unsplash.com/photo-1639322132757-14ee19fb04f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
//https://plus.unsplash.com/premium_photo-1744390860279-0922ae1a2cad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29mYSUyMDNzaXR0ZXJ8ZW58MHx8MHx8fDA%3D
//https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

export default function HomeEssentials() {
  return (
    <>
      <section className="flex items-center mt-[2rem] h-dvh ">
        <div className="flex flex-col   xl:items-end justify-end min-[0px]:items-center sm:items-center sm:w-[100%] ">
          <div className="flex flex-col gap-[2rem] w-[60%]  ">
            <EssentialHeaderBox className="uppercase text-5xl  ">
              Perfect your home
            </EssentialHeaderBox>
            <div>
              <p className=" text-[25px] sm:text-[19px] mb-[1rem]">
                For our tenants, we have an extensive range of properties
                available to rent
              </p>
              <Button to="/homepage" type="secondary" className="text-[22px]">
                shop home essentials
              </Button>
            </div>
          </div>
        </div>

        <HomeEssentialsSection className="sm:hidden md:block  min-[0px]:hidden xl:block lg:block w-[80%]">
          <BgOverlay
            as="essentials"
            className="w-full h-full text-center"
          ></BgOverlay>
        </HomeEssentialsSection>
      </section>

      <section className="mt-[16rem] flex justify-center text-center py-16 ">
        <FlexDiv>
          {merchants.map((merchant, index) => {
            return (
              <FlexInnerDiv key={index} className="">
                <div className=" flex flex-col items-center justify-center gap-3">
                  <StyledIconDiv>
                    <img src={merchant.imgLink} />
                  </StyledIconDiv>
                  <Heading as="h5" className="font-bold text-2xl">
                    {merchant.craftGroup}
                  </Heading>
                  <p className="text-[18px] px-5">
                    Find your dream home today! Expert guidance, endless options
                    and unbeatable prices your perfect haven awaits start
                    searching now and make it yours
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
