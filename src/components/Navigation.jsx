import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import supabase from "../services/supabaseClients";
import { useState } from "react";
import MyAccountLinks from "./MyAccountLinks";
import { FaAngleDown } from "react-icons/fa";
import Logout from "./Logout";
import { useAuthContext } from "../hooks/useAuthContext";

export const StyledNavLink = styled(NavLink)`
  padding: 0.4rem 0.2rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  &:link,
  &:visited {
    /* color: #fff; */
    text-decoration: none;
    border-bottom: 1px solid #144c6f;
  }

  &.active {
    color: #c1c124;
  }

  &:hover {
    background-color: #1e1b1b;
    color: #fff;
  }
`;

export default function Navigation() {
  const { user } = useAuthContext();

  return (
    <nav
      className={
        "flex justify-around text-[#fff] items-center h-28 px-6 bg-[#144c6f]"
      }
    >
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex justify-around gap-14 items-center ">
        <StyledNavLink exact to="/rent">
          Rent
        </StyledNavLink>

        {/* <StyledNavLink to="/sell">Sell</StyledNavLink> */}

        <StyledNavLink to="/buy">Buy</StyledNavLink>

        <StyledNavLink to="/homeessentials">Home essentials</StyledNavLink>

        {/* <div className="flex items-center justify-between  basis-1/3"> */}
        {user && (
          <StyledNavLink
            to="/myaccount/dashboard"
            className=" gap-4 flex  flex-col"
          >
            My account
          </StyledNavLink>
        )}

        <StyledNavLink to="advertisement">Advertisement</StyledNavLink>

        {!user && <StyledNavLink to="signin">Signin</StyledNavLink>}

        {user && <Logout />}
      </div>
    </nav>
  );
}

// export default Navigation;
