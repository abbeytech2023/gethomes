import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

import Logout from "./Logout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";

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
  const { authenticatedUser } = useFetchUsersWithId(user?.id);

  const isAdmin = authenticatedUser?.[0]?.is_admin;

  console.log(isAdmin);

  // console.log(isAdmin);

  return (
    <nav
      className={
        "flex justify-around text-[#fff] items-center h-21 px-6 bg-[#144c6f]"
      }
    >
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center justify-around gap-14 ">
        {isAdmin && (
          <StyledNavLink exact to="/admin131">
            Admin
          </StyledNavLink>
        )}
        <StyledNavLink exact to="/rent">
          Rent
        </StyledNavLink>

        {/* <StyledNavLink to="/sell">Sell</StyledNavLink> */}

        <StyledNavLink to="/buy">Buy</StyledNavLink>

        <StyledNavLink to="/homeessentials">Home essentials</StyledNavLink>

        {user && (
          <StyledNavLink
            to="/myaccount/dashboard"
            className="flex flex-col gap-4 "
          >
            My account
          </StyledNavLink>
        )}

        <StyledNavLink to="aboutus">AboutUs</StyledNavLink>

        {/* <StyledNavLink to="/advertisement">Advertisement</StyledNavLink> */}

        {!user && <StyledNavLink to="signin">Signin</StyledNavLink>}

        {user && <Logout />}
      </div>
    </nav>
  );
}

// export default Navigation;
