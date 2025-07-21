// import Form from "../components";
// import { doc, updateDoc } from "firebase/firestore";

import ProfileFormEdit from "./ProfileFormEdit";

// .pizza.sold-out img {
//   filter: grayscale();
//   opacity: 0.8;
// }

// Email regex: /\S+@\S+\.\S+/

function Profile() {
  return (
    <>
      <div className=" items-center justify-center flex-col text-lg mb-[10rem] ">
        <ProfileFormEdit />
      </div>
    </>
  );
}

export default Profile;
