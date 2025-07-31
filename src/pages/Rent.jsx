import PropertiesToLet from "../components/PropertiesToLet";
import { useFetchPropertiesTolet } from "../hooks/useProperties";

import styled from "styled-components";

const RentSection = styled.section`
  height: 100vh;
  width: 100%;
  padding-top: 8rem;
  /* background-image: url(${"https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772815.jpg?ga=GA1.1.1664397121.1748562149&semt=ais_items_boosted&w=740"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */
`;

const RentHeaderBox = styled.div`
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
`;

import { BgOverlay } from "../components/BgOverlay";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { data } from "react-router-dom";

export default function Rent() {
  const { propToLet, isPending: isLoading } = useFetchPropertiesTolet();
  console.log("RENT", propToLet);

  return (
    <>
      <div className="flex">
        <RentSection className="  w-full h-screen">
          <BgOverlay as="rent" className="relative w-full h-full ">
            <div className="absolute flex bottom-9 flex-col gap-[1rem]   justify-center max-w-[80rem] text-[#fff] px-[5%]  h-[19rem] top-20   sm:left-0 md:left-0 lg:left-23 xl:left-23 bg-[rgba(32,32,32,0.79)] ">
              <p className="text-[22px]">Home &gt; property to rent</p>
              <RentHeaderBox className="uppercase text-4xl min-[0px]:font-light font-extrabold ">
                Property to rent
              </RentHeaderBox>
              <p className="text-[25px] sm:text-[19px]">
                For our tenants, we have an extensive range of properties
                available to rent
              </p>
            </div>
            <div className="w-[60%] ">
              <img
                src="https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772815.jpg?ga=GA1.1.1664397121.1748562149&semt=ais_items_boosted&w=740"
                width="100%"
              />
            </div>
          </BgOverlay>
        </RentSection>
      </div>

      <div className="mt-[15rem]">
        <PropertiesToLet />
      </div>
      {/* <div className="mt-32">
        <CreatePropertiesToLetForm />
      </div> */}
    </>
  );
}
