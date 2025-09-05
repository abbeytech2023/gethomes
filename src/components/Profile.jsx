import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import ProfileFormEdit from "./ProfileFormEdit";
import { useUser } from "../hooks/useUser";

// .pizza.sold-out img {
//   filter: grayscale();
//   opacity: 0.8;
// }

// Email regex: /\S+@\S+\.\S+/

function Profile() {
  const { user } = useUser();
  const id = user?.id;

  const { authenticatedUser } = useFetchUsersWithId(id);

  return (
    <>
      <div className="text-lg mb-[10rem] ">
        <ProfileFormEdit user={id && authenticatedUser?.[0]} />
      </div>
    </>
  );
}

export default Profile;
