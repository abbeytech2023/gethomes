import styled from "styled-components";
import { BgOverlay } from "../components/BgOverlay";
import PropertiesForSale from "../components/PropertiesForSale";

import SpinnerMini from "../components/SpinnerMini";
import BasicPagination from "../components/Pagination";

const BuySection = styled.section`
  height: 70vh;
  padding-top: 9rem;
  background-image: url(${"https://media.istockphoto.com/id/1333447841/photo/rearview-shot-of-a-young-couple-standing-outside-their-new-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=_hcSwYn0vwCu4PPv1CQXAA5AhHgA-td3PRaJooL2bIM="});
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
      <div className="flex items-center md:justify-end min-[0px]:justify-center lg:justify-end xl:justify-end  mt-[2rem] relative h-dvh">
        <div className=" absolute flex  flex-col  gap-[1rem] text-center  justify-center max-w-[80rem] text-[#fff] px-[5%] top-55  h-[19rem] sm:left-0 md:left-0 lg:left-23 xl:left-23 bg-[rgba(32,32,32,0.79)] ">
          <BuyHeaderBox className="text-5xl font-extrabold uppercase ">
            Get Ready to move
          </BuyHeaderBox>
          <p className="text-[#fff] text-center  text-2xl sm:text-3xl mt-5">
            your step by step guide to a stress free relocation
          </p>
        </div>
        <div className="w-[60%] sm:w-[100%]  md:w-[70%] lg:w-[60%] xl:w-[60%] min-[0px]:w-[100%]">
          <BuySection className="">
            <BgOverlay as="buy" className="relative w-full h-full"></BgOverlay>
          </BuySection>
        </div>
      </div>
      {/* ------------------- BUY RENT SELL SECTION -------------  */}

      <section className="mt-[9rem]">
        <PropertiesForSale />
      </section>
      <BasicPagination />
    </>
  );
}

export default BuyPage;
