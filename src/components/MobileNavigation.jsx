import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Logo from "./Logo";
import styled from "styled-components";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiFileFind } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";
import { BiHomeSmile } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import MyAccountLinks from "./MyAccountLinks";

// Hooks
import { useUser } from "../hooks/useUser";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "./Button";
import { IoArrowBack } from "react-icons/io5";

const StyledMainNav = styled.nav`
  .main-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    opacity: 0;
    /* background-color: transparent; */
    /* top: 2;
    left: 0; */
    z-index: 99;
    width: 100%;
    height: 100vh;
    font-weight: 700;
    transform: translateY(-100%);
    transition: all 0.3s ease-in;
    visibility: hidden;
    pointer-events: none;
  }
`;

const StyledMainNavList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;

  text-decoration: none;

  list-style: none;

  & a {
    border-bottom: 1px solid #fff;
    padding: 1rem 2rem;
    color: #43525b;
  }

  & a.active {
    color: goldenrod;
  }

  & a.active:hover {
    background-color: rgba(67, 82, 91, 0.317);
  }

  & a:hover {
    background-color: rgba(218, 165, 32, 0.317);
  }
`;

const StyledNavLink = styled(NavLink)`
  /* font-size: 1rem; */
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;

  /* color: #222; */
`;

const StyledIconDiv = styled.div`
  color: #43525b;
  font-size: 1.125rem;
  font-weight: 500;

  & .active {
    color: goldenrod;
  }
`;

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAcct, setIsOpenAcct] = useState(false);
  const { isAuthenticated } = useUser();

  const location = useLocation();

  const myAccount = location.pathname.startsWith("/myaccount/");
  const merchants = location.pathname.startsWith("/merchants/");

  let numref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!numref.current.contains(event.target)) {
        setIsOpen(false);
      }
    });
  }, []);

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <StyledMainNav className="xl:hidden z-[99]  lg:hidden px-2 py-4 flex items-center justify-between relative  xl:text-4xl sm:text-2xl bg-[#144c6f]  text-[#fff]">
        <div className="flex gap-2 ">
          <div className="md:hidden">
            {myAccount && (
              <Button to="/myaccount">
                <IoArrowBack className="rounded z-30 text-3xl" />
              </Button>
            )}
          </div>

          <NavLink to="/" className="  top-3 left-4 ">
            <Logo type="mobile" className="" />
          </NavLink>
        </div>
        <div>
          <div className="justify-between xl:hidden text-4xl lg:hidden mr-4 ">
            {!isOpen && (
              <GiHamburgerMenu
                className={" ml-auto xl:text-7xl"}
                onClick={handleIsOpen}
              />
            )}
            {
              <IoCloseSharp
                className={
                  !isOpen ? "hidden" : "ml-auto xl:text-7xl  sm:text-2xl  "
                }
                onClick={() => setIsOpen(!isOpen)}
              />
            }
          </div>
        </div>
      </StyledMainNav>
      <div
        className=" font-bold bg-[#fff] text-lg"
        ref={numref}
        onClick={handleIsOpen}
      >
        {isOpen && (
          <Navigation
            isAuthenticated={isAuthenticated}
            isOpenAcct={isOpenAcct}
            setIsOpenAcct={setIsOpenAcct}
          />
        )}
      </div>
    </>
  );
}

export default MobileNavigation;

function Navigation({ isOpenAcct, setIsOpenAcct, isAuthenticated }) {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="lg:hidden xl:hidden h-screen ">
      <StyledMainNavList>
        {/* {user && ( */}

        {user && (
          <StyledNavLink to="/myaccount" onClick={() => setIsOpenAcct(false)}>
            <div>My account</div>

            <StyledIconDiv>
              <CgProfile />
            </StyledIconDiv>
          </StyledNavLink>
        )}

        {/* )} */}

        <StyledNavLink to="/rent">
          <div>Rent</div>
          <StyledIconDiv>
            <TbHomeSearch />
          </StyledIconDiv>
        </StyledNavLink>

        {/* <StyledNavLink to="/sell">
          <div>Sell</div>
          <StyledIconDiv>
            <MdOutlineSell />
          </StyledIconDiv>
        </StyledNavLink> */}

        <StyledNavLink to="/buy">
          <div> Buy</div>
          <StyledIconDiv>
            <BiHomeSmile />
          </StyledIconDiv>
        </StyledNavLink>

        <StyledNavLink to="/homeessentials">
          <div> Home essentials</div>
          <StyledIconDiv>
            <BiFileFind />
          </StyledIconDiv>
        </StyledNavLink>

        <StyledNavLink to="/">
          <div>Advertisement </div>
          <StyledIconDiv>
            <RiAdvertisementLine />
          </StyledIconDiv>
        </StyledNavLink>

        {!user && (
          <StyledNavLink to="/signin">
            <div> Signin </div>
          </StyledNavLink>
        )}

        {user && (
          <Link onClick={logout} to="/signin" className="flex justify-between ">
            <div>Logout</div>

            <StyledIconDiv>
              <RiLogoutBoxRLine />
            </StyledIconDiv>
          </Link>
        )}
      </StyledMainNavList>
    </nav>
  );
}
