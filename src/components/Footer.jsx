import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import styled from "styled-components";

const IconDiv = styled.div`
  font-size: 32px;
  background-color: black;
  border-radius: 30%;
  overflow: hidden;
  border: 1px solid white;
`;

export default function Footer() {
  return (
    <div className="bg-[#666] mt-12 xl:flex-row  lg:flex-row text-white flex sm:flex-col gap-8 sm:gap-5 min-[0px]:px-[4%] min-[0px]:flex-col text-center text-[1rem] justify-center py-12">
      <div>
        <p>Fair housing opportunity for everyone | &#169; 2025</p>
      </div>
      <div>Urban Oasis: Where City Meets Serenity | Follow us on</div>

      <div className="flex items-center gap-2  justify-center ">
        <IconDiv className="  text-4xl text-blue-500 rounded ">
          <CiFacebook />
        </IconDiv>

        <IconDiv className="  text-white ">
          <CiTwitter />
        </IconDiv>
        <IconDiv className=" text-[orangered] ">
          <CiInstagram />
        </IconDiv>
        <IconDiv className=" text-red-500 ">
          <CiYoutube />
        </IconDiv>
      </div>
    </div>
  );
}
