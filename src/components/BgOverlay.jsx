import styled, { css } from "styled-components";

export const BgOverlay = styled.div`
  ${(props) =>
    props.as === "home" &&
    css`
      /* height: ; */
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom, rgba(34, 70, 103, 0.2));
    `}

  ${(props) =>
    props.as === "rent" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 2rem;
      /* background: linear-gradient(to bottom, rgba(25, 5, 5, 0.387)); */
    `}


  ${(props) =>
    props.as === "sell" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom, rgba(7, 8, 8, 0.4));
    `}

  ${(props) =>
    props.as === "buy" &&
    css`
      /* display: flex;
      align-items: center; */
      /* justify-content: end; */
      background: linear-gradient(to bottom, rgba(11, 4, 11, 0.302));
    `}


  ${(props) =>
    props.as === "essentials" &&
    css`
      display: flex;
      align-items: stretch;
      justify-content: end;
      /* background: linear-gradient(to bottom, rgba(223, 235, 240, 0.4)); */
    `}
`;

// export const Heading = styled.h1`
//   ${(props) =>
//     props.as === "h1" &&
//     css`
//       /* font-size: 2rem; */
//       color: #a8c1d1;
//       line-height: 1.1;
//     `}
