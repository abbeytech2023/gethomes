import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { GiMailbox } from "react-icons/gi";
import { PiWhatsappLogo, PiWhatsappLogoBold } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

import styled from "styled-components";

const IconDiv = styled(Link)`
  font-size: 32px;
  /* background-color: black; */
  border-radius: 30%;
  overflow: hidden;
  border: 1px solid white;
`;

export default function Footer() {
  return (
    <div className="bg-[#666] mt-12 xl:flex-row  lg:flex-row text-white flex sm:flex-col gap-8 sm:gap-5 min-[0px]:px-[4%] min-[0px]:flex-col text-center text-[1rem] justify-center py-12">
      <div>
        <p>
          &copy; {new Date().getFullYear()} Gethomes Real Estate & Artisan
          Marketing Co. All Rights Reserved.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 cursor-pointer ">
        <IconDiv to="" className="text-4xl text-blue-500 bg-black rounded ">
          <CiFacebook />
        </IconDiv>

        <IconDiv className="text-white bg-black ">
          <CiTwitter />
        </IconDiv>
        <IconDiv
          to="https://www.instagram.com/gethomes.ng?igsh=MWloNzlzN3BncThrMw=="
          className=" text-[orangered] bg-black "
        >
          <CiInstagram />
        </IconDiv>
        <IconDiv className="text-red-500 bg-black ">
          <CiYoutube />
        </IconDiv>
        <IconDiv className="text-red-500 bg-white">
          <SiGmail />
        </IconDiv>
      </div>
    </div>
  );
}
