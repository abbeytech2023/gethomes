import styled from "styled-components";
import { BgOverlay } from "../components/BgOverlay";
import PropertiesForSale from "../components/PropertiesForSale";

import { useFetchPropertiesForSale } from "../hooks/useProperties";
import { Heading } from "../components/HeadingText";
const BuySection = styled.section`
  height: 70vh;
  padding-top: 9rem;
  background-image: url(${"https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2luZ3xlbnwwfHwwfHx8MA%3D%3D"});
  /* background-image: url(${"https://media.istockphoto.com/id/1333447841/photo/rearview-shot-of-a-young-couple-standing-outside-their-new-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=_hcSwYn0vwCu4PPv1CQXAA5AhHgA-td3PRaJooL2bIM="}); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const BuyHeaderBox = styled.div`
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
`;

function BuyPage() {
  // const [forSale, setForSale] = useState();

  return (
    <>
      <BgOverlay as="buy">
        <div className="flex items-center md:justify-end min-[0px]:justify-center lg:justify-end xl:justify-end  mt-[2rem] h-dvh">
          <div className="  flex  flex-col  gap-[1rem] text-center  justify-center max-w-[80rem] text-[#021625] px-[5%] top-55  h-[19rem] sm:left-0 md:left-0 lg:left-23 xl:left-23  ">
            <BuyHeaderBox className="text-3xl font-extrabold text-left uppercase ">
              <Heading as="h1" className="text-[#000]">
                Your Home Awaits, Explore Our Listings Now
              </Heading>
            </BuyHeaderBox>
            <ul className="flex text-left  flex-col gap-5 text-[1.1rem] text-[#fff]   sm:text-3xl mt-5">
              <li className="text-[1.5rem]">
                Modern Luxuries, Timeless Charm, Explore Our Luxury Homes
              </li>
              <li className="text-[1.5rem]">
                A place To Call Your Own, Find Your Dream Home
              </li>
            </ul>
          </div>
          <div className="   md:w-[70%] lg:w-[60%] xl:w-[60%] max-[767px]:hidden mx-auto">
            <BuySection className=""></BuySection>
            {/* <BgOverlay as="buy" className="relative w-full h-full"></BgOverlay> */}
          </div>
        </div>
      </BgOverlay>
      {/* ------------------- BUY RENT SELL SECTION -------------  */}

      <section className="mt-[9rem]">
        <PropertiesForSale />
      </section>
    </>
  );
}

export default BuyPage;
