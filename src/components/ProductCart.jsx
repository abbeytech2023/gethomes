// import CartCard from "./CartCard";
import { GridContainer, GridInner } from "./Grid";

import { Heading } from "./HeadingText";
import CartCard from "./CartCard";
import { FlexDiv, FlexInnerDiv } from "./FlexDiv";

//HOOKS

// const ProductDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 2rem;
// `;

function ProductCart({ documents }) {
  return (
    <div className="mb-[8rem] w-[70%] text-center mx-auto ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-16">
        Properties for sale
      </Heading>
      {/* {isPending && <SpinnerMini />} */}
      <GridContainer className="mx-auto">
        <CartCard document={documents} />
      </GridContainer>
    </div>
  );
}

export default ProductCart;
