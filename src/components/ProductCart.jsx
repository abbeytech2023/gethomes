// import CartCard from "./CartCard";
import { GridInner } from "./Grid";

import { Heading } from "./HeadingText";
import CartCard from "./CartCard";
import { FlexDiv } from "./FlexDiv";

//HOOKS

// const ProductDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 2rem;
// `;

function ProductCart({ documents }) {
  return (
    <div className="mb-[8rem] flex flex-col items-center justify-center  ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-16">
        Properties for sale
      </Heading>
      {/* {isPending && <SpinnerMini />} */}

      {documents && documents.length === 0 ? (
        <p className="text-center text-3xl uppercase">
          you do not have a property listed for sale
        </p>
      ) : (
        <FlexDiv className="">
          <>
            {documents.map((document) => {
              return (
                <div key={document.uid}>
                  <CartCard document={document} />
                </div>
              );
            })}
          </>
        </FlexDiv>
      )}
    </div>
  );
}

export default ProductCart;
