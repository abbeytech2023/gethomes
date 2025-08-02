import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useSignup() {
  const [errMessage, setErrMessage] = useState();
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/homepage");
      toast.success("Account created successfully");
    },
    onError: (err) => {
      if (err.message === "User already registered") {
        setErrMessage("email already taken");
      }
      toast.error(errMessage);
    },
  });

  return { signup, isPending };
}
