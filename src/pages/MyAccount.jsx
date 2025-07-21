import { Outlet, useLocation } from "react-router-dom";
// import MyProperties from "./MyProperties";
import SideNavBar from "../components/SideNavBar";

export default function MyAccount() {
  const location = useLocation();

  // const myAccount = location.pathname === "/myaccount";
  // console.log(myAccount);

  return (
    <>
      <div className="relative flex min-[0px]:mx-auto  xl:mx-0 lg:mx-0 sm:mx-auto md:mx-0 ">
        <div
          className={` flex flex-col  min-[0px]:hidden md:flex  xl:flex lg:flex sm:hidden  sm:w-[45%] lg:w-[35%] xl:w-[38%]   `}
        >
          <div className=" bottom-0 top-0">
            <div className=" w-[30%] fixed top-0 left-0  h-[65%]">
              <ProfileDisplayPicture />
            </div>
          </div>
          <div className="fixed h-[35%] bottom-0 w-[30%] overflow-y-scroll ">
            <SideNavBar />
          </div>
        </div>
        <div className="w-[55%] min-[0px]:w-[90%] md:w-[55%] sm:w-[100%] mt-32 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

function ProfileDisplayPicture() {
  return (
    <div className="mt-32  tracking-wide gap-7 flex flex-col items-center ">
      <h2 className="font-medium text-3xl md:text-2xl tracking-wider">
        Account Profile
      </h2>
      <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem] bg-blue-700">
        OA
      </div>
      <p className="font-[500] text-[1.38rem]  md:text-[1.1rem]">
        Olanipekun Abbey
      </p>
      <p className="md:pl-6.5 text-[1.2rem]">olanipekunabbey@gmail.com</p>
    </div>
  );
}
