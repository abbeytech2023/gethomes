import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVenues } from "../services/apiVenues";
import { toYoutubeEmbed } from "../utility/youtubeLinkConverts";

export default function VenueForm() {
  const [currentState, setCurrentState] = useState();

  const queryClient = useQueryClient();

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );
  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState || ""} `
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: addVenues,
    onSuccess: () => {
      toast.success("property added successfully");
      queryClient.invalidateQueries({ queryKey: ["ToLet"] });
      reset();
    },
    onError: (error) => {
      console.log(error);

      toast.error("property could not be added");
    },
  });

  const onSubmit = async (data) => {
    const videoUrl = toYoutubeEmbed(data.videoUrl);

    console.log(data);
    mutate({ ...data, videoUrl, image: data.image[0], image1: data.image1[0] });
  };

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    // console.log(localGovts);
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Add New Venue
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Venue Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Venue Name
          </label>
          <input
            type="text"
            placeholder="Enter venue name"
            {...register("name", { required: "Venue name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Location (City)
          </label>
          <input
            type="text"
            placeholder="Enter city"
            {...register("address", { required: "Location is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">States</label>

          <select
            name="allState"
            id="state"
            // value={currentState}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("state", {
              onChange: (e) => handleOnChange(e),
              required: "This field is required",
              minLength: {
                message: "select one profession from the list below",
              },
            })}
          >
            <option key="default" value="all">
              All
            </option>
            {allStates?.map((state, i) => {
              return (
                <option value={state} key={i}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>

        {/* Local Government */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Local Government
          </label>
          <select
            name="localGovts"
            id="localGovernment"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            {...register("localGovernment", {
              required: "This field is required",
              minLength: {
                message: "select one profession from the list below",
              },
            })}
          >
            <option key="default">choose</option>
            {localGovts?.map((lga, i) => {
              return (
                <option key={i} value={lga}>
                  {lga}
                </option>
              );
            })}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Write a short description..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Video URL
          </label>
          <input
            type="url"
            placeholder="Enter a YouTube or Vimeo video link"
            {...register("videoUrl", {
              required: "Video URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/,
                message: "Enter a valid YouTube or Vimeo URL",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.videoUrl && (
            <p className="mt-1 text-sm text-red-500">
              {errors.videoUrl.message}
            </p>
          )}
        </div>

        {/* Photo Upload  */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Venue Photo 1
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Photo is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-indigo-400"
          />
          {errors.photo && (
            <p className="mt-1 text-sm text-red-500">{errors.photo.message}</p>
          )}
        </div>
        {/*  Photo Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Venue Photo 2
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image1", { required: "Photo is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-indigo-400"
          />
          {errors.photo && (
            <p className="mt-1 text-sm text-red-500">{errors.photo.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit Venue"}
        </button>
      </form>
    </div>
  );
}
