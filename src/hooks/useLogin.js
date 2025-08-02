import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export function useLogin() {
  const [errMessage, setErrMessage] = useState();
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
      if (err.message === "Failed to fetch") {
        setErrMessage("check your internet connection");
        toast.error(errMessage);
      } else {
        toast.error(err.message);
      }
    },

    // onSettled: () => reset
  });

  return { login, isPending };
}
