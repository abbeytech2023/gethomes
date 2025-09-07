import PropertiesToLet from "../components/PropertiesToLet";

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
import supabase from "../services/supabaseClients";
import { data } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Rent() {
  return (
    <>
      <div className="flex">
        <RentSection className="w-full h-screen ">
          <BgOverlay as="rent" className="relative w-full h-full ">
            <div className=" flex  flex-col gap-[1rem]    justify-center max-w-[80rem] text-[#fff] px-[5%]  h-[19rem] top-20   sm:left-0 md:left-0 lg:left-23 xl:left-23 bg-[rgba(32,32,32,0.79)] ">
              <p className="text-[22px]">Home &gt; property to rent</p>
              <RentHeaderBox className="uppercase text-3xl min-[0px]:font-light font-extrabold ">
                Property to rent
              </RentHeaderBox>
              <p className="text-[20px] sm:text-[19px]">
                For our tenants, we have an extensive range of properties
                available to rent
              </p>
            </div>
            {/* <div className="w-[60%] ">
              <img
                // src="https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772815.jpg?ga=GA1.1.1664397121.1748562149&semt=ais_items_boosted&w=740"
                width="100%"
              />
            </div> */}
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
