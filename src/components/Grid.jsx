import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  margin-top: 2rem;
  /* max-width: 1200rem; */
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-template-rows: auto;
  grid-gap: 2rem;
  row-gap: 3rem;
`;

// .work {
//   border-radius: 1rem;
//   position: relative;
//   overflow: hidden;
//   box-shadow: 7px 3px 8px rgba(85, 85, 85, 0.487);
// }

export const GridInner = styled.div`
  border-radius: 1rem;
  /* background-color: #fff; */
  position: relative;
  overflow-x: hidden;
  box-shadow: 4px 3px 6px rgba(85, 85, 85, 0.487);
  /* width: 70%; */

  height: 100%;
`;
