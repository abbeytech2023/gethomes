import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import ProfileDisPlayPicture from "../components/ProfileDisPlayPicture";
import MyAccountMobile from "../components/MyAccountMobile";
import { useUser } from "../hooks/useUser";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";

export default function MyAccount() {
  const { user } = useUser();
  const { authenticatedUser } = useFetchUsersWithId(user?.id);

  const authUser = authenticatedUser?.[0];

  const location = useLocation();

  const myAccount = location.pathname === "/myaccount";

  // const myAccount = location.pathname === "/myaccount";
  // console.log(myAccount);

  return (
    <>
      {myAccount && (
        <div className="md:hidden lg:hidden xl:hidden">
          <MyAccountMobile userDetails={authUser} />
        </div>
      )}
      <div className="relative flex min-[0px]:mx-auto  xl:mx-0 lg:mx-0 sm:mx-auto md:mx-0 ">
        <div
          className={`flex flex-col  min-[0px]:hidden md:flex  xl:flex lg:flex sm:hidden  sm:w-[45%] lg:w-[35%] xl:w-[38%]   `}
        >
          <div className=" w-[30%] fixed top-0 left-0  h-[65%]">
            <ProfileDisPlayPicture userDetails={authUser} />
          </div>
          <div className="fixed h-[30%] bg-[#dfebef] bottom-0 w-[30%] overflow-y-scroll ">
            <SideNavBar userDetails={authUser} />
          </div>
        </div>
        <div className="w-full min-[760px]:ml-[6rem] mx-5 mt-32 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
