import SideNavBar from "./SideNavBar";
import ProfileDisPlayPicture from "./ProfileDisPlayPicture";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";

export default function MyAccountMobile({ userDetails }) {
  console.log(userDetails);

  return (
    <div>
      <div className="border-2">
        <ProfileDisPlayPicture userDetails={userDetails} />
      </div>
      <div className="absolute bottom-[-15px] left-0 right-0 bg-amber-600">
        <SideNavBar userDetails={userDetails} />
      </div>
    </div>
  );
}
