import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      toast.success("logged in successfully");
      navigate("/homepage", { replace: true });
    },
    onError: (err) => {
      console.log(("ERROR", err));
      console.error(err);

      toast.error(err?.message);
    },

    // onSettled: () => reset
  });

  return { login, isPending };
}
