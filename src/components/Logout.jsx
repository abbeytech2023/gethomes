import useLogout from "../hooks/useLogout";
import { StyledNavLink } from "./Navigation";

export default function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <StyledNavLink>
      <button
        onClick={logout}
        className="text-white text-[1rem] font-medium cursor-pointer hover:bg-[#1e1b1b]"
      >
        Logout
      </button>
    </StyledNavLink>
  );
}
