import PropertiesToLet from "../components/PropertiesToLet";
import { motion } from "framer-motion";

import styled from "styled-components";

const RentSection = styled.section`
  height: 100vh;
  width: 100%;
  padding-top: 8rem;
  background-image: url(${"https://images.unsplash.com/photo-1569706971306-de5d78f6418e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const RentHeaderBox = styled.div`
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
`;

import { BgOverlay } from "../components/BgOverlay";
import { useEffect, useState } from "react";
import { Heading } from "../components/HeadingText";

export default function Rent() {
  return (
    <>
      <div className="flex">
        <RentSection className="w-full h-screen ">
          <BgOverlay as="rent" className="relative w-full h-full ">
            <div className="max-[600px]:px-4">
              <Heading
                as="rent"
                className="mb-4 text-4xl font-bold md:text-6xl"
              >
                Find the Best Homes for Rent
              </Heading>
              <p className="mb-8 text-lg  font-medium md:text-xl bg-black py-2.5 text-[#cde3f0]">
                Discover apartments, duplexes, and luxury homes available in
                your favorite locations.
              </p>
            </div>
          </BgOverlay>
        </RentSection>
      </div>

      <div className="mt-[15rem]">
        <PropertiesToLet />
      </div>
      <div className="mt-32"></div>
    </>
  );
}
