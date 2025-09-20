import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useUpdateUserData } from "../hooks/useProperties";

export default function EditProfileForm() {
  const [fields, setFields] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    address: "123 Main Street, City",
  });

  const [editMode, setEditMode] = useState({});

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
    console.log(editMode);

    // You could also trigger an API call here to save the field
  };

  const handleChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const { user } = useUser();

  console.log(user);

  const id = user?.id;
  const { mutate } = useUpdateUserData(id);

  const [displayName, setDisplayName] = useState(user && user.displayName);
  const [email, setEmail] = useState();
  const [NIN, setNin] = useState();
  const [gender, setgender] = useState();
  const [state, setState] = useState();
  const [localGovt, setLocalGovt] = useState();
  const [homeAdress, setHomeAdress] = useState();
  const [officeAdress, setOfficeAdress] = useState();
  const [occupation, setOccupation] = useState();
  const [mobilePhone, setMobilePhone] = useState();
  const [googleLink, setGoogleLink] = useState();
  const [instagramLink, setInstagramLink] = useState();
  const [facebookLink, setFacebookLink] = useState();

  const inputRefState = useRef(null);
  const inputRefLocalGovt = useRef(null);
  const inputRefNIN = useRef(null);
  const inputRefOfficeAddress = useRef(null);
  const inputRefHomeAddress = useRef(null);
  const inputRefGener = useRef(null);
  const inputRefOccupation = useRef(null);
  const inputRefMobilePhone = useRef(null);
  const inputRefGoogleLink = useRef(null);
  const inputRefInstagram = useRef(null);
  const inputRefFacebook = useRef(null);

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${state}`
  );

  useEffect(() => {
    const getUserDetails = () => {
      setDisplayName(user && user.displayName);
      setState(user && user.State);
      setEmail(user && user.email);
      setNin(user && user.NIN);
      setgender(user && user.gender);
      setLocalGovt(user && user.localGovt);
      setHomeAdress(user && user.homeAdress);
      setOfficeAdress(user && user.officeAdress);
      setOccupation(user && user.occupation);
      setMobilePhone(user && user.phone);
      setGoogleLink(user && user.googleLink);
      setInstagramLink(user && user.instagramLink);
      setFacebookLink(user && user.facebookLink);
      setInstagramLink(user && user.googleLink);
    };
    getUserDetails();
  }, [user]);

  return (
    <div className="max-w-4xl p-6 mx-auto mt-32 bg-white shadow-md rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Edit Profile
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">DisplayName</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              // ref={}
              disabled
              onChange={(e) => setDisplayName(e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.firstName
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.firstName ? (
              <button
                onClick={() => handleSave("firstName")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("firstName")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              disabled={!editMode.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.email
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.email ? (
              <button
                onClick={() => handleSave("email")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("email")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">State</label>
          <div className="flex gap-2">
            <select
              onChange={(e) => setLocalGovt(e.target.value)}
              value={localGovt}
              ref={inputRefLocalGovt}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.email
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <option key="default">{user?.localGovt}</option>
              {localGovts?.map((lga, i) => {
                return (
                  <option key={i} value={lga}>
                    {lga}
                  </option>
                );
              })}
            </select>
            {editMode.email ? (
              <button
                onClick={() => {}}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("localGovt")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* local govt*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">local govt</label>
          <div className="flex gap-2">
            <select
              onChange={(e) => setLocalGovt(e.target.value)}
              value={localGovt}
              ref={inputRefLocalGovt}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.email
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <option key="default">{user?.localGovt}</option>
              {localGovts?.map((lga, i) => {
                return (
                  <option key={i} value={lga}>
                    {lga}
                  </option>
                );
              })}
            </select>
            {editMode.phone ? (
              <button
                onClick={() => {
                  inputRefLocalGovt.current.disabled = true;
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => (inputRefLocalGovt.current.disabled = false)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">FacebookLink</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={facebookLink}
              disabled={!editMode.facebookLink}
              onChange={(e) => handleChange("facebookLink", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.facebookLink
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.facebookLink ? (
              <button
                onClick={() => handleSave("facebookLink")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("facebookLink")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">
            InstagramLink
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={fields.email}
              disabled={!editMode.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.email
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.email ? (
              <button
                onClick={() => handleSave("email")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("email")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Google Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={fields.email}
              disabled={!editMode.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.email
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.email ? (
              <button
                onClick={() => handleSave("email")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("email")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/*NiN*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">NIN</label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={fields.phone}
              disabled={!editMode.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.phone
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.phone ? (
              <button
                onClick={() => handleSave("phone")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("phone")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Address</label>
          <div className="flex gap-2">
            <textarea
              rows="3"
              value={fields.address}
              disabled={!editMode.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.address
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            ></textarea>
            {editMode.address ? (
              <button
                onClick={() => handleSave("address")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("address")}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
