import { useLogin } from "../hooks/useLogin";
import { StyledNavLink } from "./Navigation";

export default function Login() {
  const { login, isPending } = useLogin();
  return (
    <StyledNavLink>
      <button
        onClick={login}
        className="text-white text-[1.3rem] font-medium hover:bg-[#1e1b1b]"
      >
        Signin
      </button>
    </StyledNavLink>
  );
}
