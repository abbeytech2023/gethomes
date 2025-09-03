import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadProfilePicture from "../services/apiUpdateProfile";

export default function useProfilePictures(newImage, id) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => uploadProfilePicture(newImage, id),
    onSuccess: (newUrl) => {
      queryClient.invalidateQueries(["user"]);
      console.log("profile picture updated", newUrl);
    },
    onError: (err) => {
      console.log("error updating public profile picture", err.message);
    },
  });

  return { mutate, isPending };
}
