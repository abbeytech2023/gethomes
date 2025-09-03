import { Outlet, useLocation } from "react-router-dom";
// import MyProperties from "./MyProperties";
import SideNavBar from "../components/SideNavBar";
import ProfileDisPlayPicture from "../components/ProfileDisPlayPicture";
import MyAccountMobile from "../components/MyAccountMobile";
import { useUser } from "../hooks/useUser";

export default function MyAccount() {
  const { user } = useUser();
  const userDetails = user?.user_metadata;
  // console.log(userDetails);

  const location = useLocation();

  const myAccount = location.pathname === "/myaccount";

  // const myAccount = location.pathname === "/myaccount";
  // console.log(myAccount);

  return (
    <>
      {myAccount && (
        <div className="md:hidden lg:hidden xl:hidden">
          <MyAccountMobile userDetails={userDetails} />
        </div>
      )}
      <div className="relative flex min-[0px]:mx-auto  xl:mx-0 lg:mx-0 sm:mx-auto md:mx-0 ">
        <div
          className={`flex flex-col  min-[0px]:hidden md:flex  xl:flex lg:flex sm:hidden  sm:w-[45%] lg:w-[35%] xl:w-[38%]   `}
        >
          <div className=" w-[30%] fixed top-0 left-0  h-[65%]">
            <ProfileDisPlayPicture userDetails={userDetails} />
          </div>
          <div className="fixed h-[35%] bottom-0 w-[30%] overflow-y-scroll ">
            <SideNavBar />
          </div>
        </div>
        <div className="mt-32  min-[340px]:px-12 sm:w-[80%] xl:w-[70%] lg:w-[60%] ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
