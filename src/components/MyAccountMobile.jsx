import SideNavBar from "./SideNavBar";
import ProfileDisPlayPicture from "./ProfileDisPlayPicture";

export default function MyAccountMobile({ userDetails }) {
  return (
    <div>
      <div>
        <ProfileDisPlayPicture userDetails={userDetails} />
      </div>
      <div className="absolute bottom-[-15px] left-0 right-0 bg-amber-600">
        <SideNavBar />
      </div>
    </div>
  );
}
