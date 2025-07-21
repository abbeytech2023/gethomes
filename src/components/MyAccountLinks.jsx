import { Link } from "react-router-dom";
import { StyledNavLink } from "./Navigation";
import styled from "styled-components";

const StyledAccountLinks = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
`;

export default function MyAccountLinks({ bgColor, color }) {
  return (
    <StyledAccountLinks
      bgColor={bgColor}
      color={color}
      className="flex flex-col gap-4 items-start pl-6 py-6  px-3"
    >
      <StyledNavLink to="myaccount/dashboard">Dashboard</StyledNavLink>
      <StyledNavLink to="myaccount/profile">Edit Profile</StyledNavLink>
      <StyledNavLink to="myaccount/addpropertyforsale">
        Add Properties for sale
      </StyledNavLink>
      <StyledNavLink to="myaccount/addpropertytolet">
        Add Properties to let
      </StyledNavLink>
    </StyledAccountLinks>
  );
}
