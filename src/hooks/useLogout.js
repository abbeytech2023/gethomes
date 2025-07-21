import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

export default function useLogout() {
  const { isAuthenticated } = useUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("successfully logged out");
      // queryClient.removeQueries();
      navigate("/signin", { replace: true });
    },
  });

  return { logout, isPending };
}
