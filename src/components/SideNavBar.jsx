import { FaAngleRight } from "react-icons/fa6";
import { StyledNavLink } from "./Navigation";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledMyAccountLink = styled(NavLink)`
  /* box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  width: 100%;
  padding: 0 8px;
  /* background-color: red; */
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;

  height: 4.6rem;

  &.active {
    outline: 4px solid #144c6f;

    /* height: 9rem; */
  }
`;

function SideNavBar() {
  return (
    <div className="flex bg-[#dfebef]  px-1   border-[rgba(20,76,111)]   flex-col   font-semibold cursor-pointer justify-center items-center  ">
      <StyledMyAccountLink to="dashboard">
        <p>Dashboard</p>
        <FaAngleRight />
      </StyledMyAccountLink>
      <StyledMyAccountLink to="profile">
        <p>Edit Profile</p> <FaAngleRight />
      </StyledMyAccountLink>
      <StyledMyAccountLink to="addpropertyforsale">
        <p>Add property for sale</p> <FaAngleRight />
      </StyledMyAccountLink>
      <StyledMyAccountLink to="addpropertytolet">
        <p>Add property to let</p> <FaAngleRight />
      </StyledMyAccountLink>
    </div>
  );
}

export default SideNavBar;
