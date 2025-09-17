import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadProfilePicture from "../services/apiUpdateProfile";

export default function useProfilePictures(id, newImage) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => uploadProfilePicture(id, newImage),
    onSuccess: (newUrl) => {
      queryClient.invalidateQueries(["Users"]);
      console.log("profile picture updated", newUrl);
    },
    onError: (err) => {
      console.log("error updating public profile picture", err);
    },
  });

  return { mutate, isPending };
}
