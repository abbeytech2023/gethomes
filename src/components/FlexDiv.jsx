import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  max-width: 60rem;
`;

export const FlexInnerDiv = styled.div`
  border-radius: 1rem;
  background-color: #fff;

  max-width: 18rem;
  position: relative;
  /* overflow: hidden; */
  box-shadow: 7px 3px 8px rgba(85, 85, 85, 0.487);
`;

export const StyledIconDiv = styled.div`
  padding: 1rem;
  max-width: 10rem;
  height: 10rem;
  ${(props) =>
    props.as === "merchants" &&
    css`
      filter: grayscale(100%);
    `}
`;

export const StyledLinkButton = styled(Link)`
  border: 1px solid #144c6f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #144c6f;
  font-weight: 500;
  text-align: center;
  width: 12rem;
  height: 10%;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 1rem 0.3rem;
`;
