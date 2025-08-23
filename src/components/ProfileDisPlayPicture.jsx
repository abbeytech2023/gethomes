import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import FileInput from "./FileInput";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import UploadIcon from "../assets/images/upload-icon.webp";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProfileDisPlayPicture({ userDetails }) {
  const queryClient = useQueryClient();

  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: "",
    onSuccess: () => {
      toast.success("property added successfully");
      queryClient.invalidateQueries({ queryKey: ["ToLet"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data.image[0]);
  };

  return (
    <div className="mt-22 mb-12 gap-4 flex flex-col text-black items-center">
      <h2 className="font-medium  md:text-2xl tracking-wider">
        Account Profile
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" flex flex-col  text-center items-center justify-center "
      >
        <div
          label="Upload-Profile-Picture"
          className="border-2  border-black  "
        >
          <input
            id="image"
            accept="image/*"
            type="file"
            className="hidden "
            {...register("image", {
              required: "This field is required",
            })}
          />
          <label
            htmlFor="image"
            className="h-[9rem] w-[10rem] overflow-hidden block text-center"
          >
            <img src={UploadIcon} alt="upload-icon" />
          </label>
        </div>
        <FormRow>
          <Button type="primary">Upload</Button>
        </FormRow>
        {/* <Button type="primary">{isPending ? <SpinnerMini /> : "upload"}</Button> */}
      </form>
      {/* <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem] bg-blue-700">
        OA
      </div> */}
      <p className="font-[500] text-[1.1rem]   md:text-[1.1rem]">
        {userDetails?.fullName}
      </p>
      <p className="md:pl-6.5 text-[1.2rem]">{userDetails?.email}</p>
    </div>
  );
}
