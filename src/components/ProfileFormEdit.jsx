import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useUpdateUserData } from "../hooks/useProperties";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import { ProfessionOptions } from "../components/ProfessionOptions";

export default function EditProfileForm({ user }) {
  const id = user?.id;
  const { authenticatedUser } = useFetchUsersWithId(id);
  const authUser = authenticatedUser?.[0];

  console.log(authUser);

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

  console.log(authenticatedUser);

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

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${state}`
  );

  useEffect(() => {
    const getUserDetails = () => {
      setDisplayName(user && user.displayName);
      setState(user && user.state);
      setEmail(user && user.email);
      setNin(user && user.NIN);
      setgender(user && user.gender);
      setLocalGovt(user && user.localGovt);
      setHomeAdress(user && user.homeAdress);
      setOfficeAdress(user && user.officeAdress);
      setOccupation(user && user.profession);
      setMobilePhone(user && user.phone);
      setGoogleLink(user && user.googleLink);
      setInstagramLink(user && user.instagramLink);
      setFacebookLink(user && user.facebookLink);
      setInstagramLink(user && user.googleLink);
    };
    getUserDetails();
  }, [user]);

  return (
    <div className="max-w-4xl p-6 bg-white shadow-md rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Edit Profile
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">DisplayName</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={displayName}
              disabled={!editMode.displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.displayName ? (
              <button
                onClick={() => {
                  handleSave("displayName");
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  handleEdit("displayName");
                }}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
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
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              disabled={!editMode.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`p-3 border rounded-lg w-full flex-1 ${
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
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">State</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              onChange={(e) => setState(e.target.value)}
              // value={state}
              defaultValue={state}
              disabled={!editMode.state}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.state
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <option key="default">{authUser?.state}</option>
              {allStates?.map((lga, i) => {
                return (
                  <option key={i} value={lga}>
                    {lga}
                  </option>
                );
              })}
            </select>
            {editMode.state ? (
              <button
                onClick={() => {
                  handleSave("state");
                  mutate({ state });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  // inputRefState.current.focus();
                  handleEdit("state");
                }}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* local govt*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">local govt</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              onChange={(e) => setLocalGovt(e.target.value)}
              value={localGovt}
              disabled={!editMode.localGovt}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.localGovt
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
            {editMode.localGovt ? (
              <button
                onClick={() => {
                  handleSave("localGovt");
                  mutate({ localGovt });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("localGovt")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Occupation*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Occupation</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              disabled={!editMode.occupation}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.state
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <option key="default">{user?.profession}</option>
              {ProfessionOptions.map((opt) => {
                return (
                  <option key={opt.text} value={opt.value}>
                    {opt.text}
                  </option>
                );
              })}
            </select>
            {editMode.occupation ? (
              <button
                onClick={() => {
                  mutate({ profession: occupation });
                  handleSave("occupation");
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("occupation")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Gender</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              onChange={(e) => setgender(e.target.value)}
              value={gender}
              disabled={!editMode.gender}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.localGovt
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
            {editMode.gender ? (
              <button
                onClick={() => {
                  mutate({ gender });
                  handleSave("gender");
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  handleEdit("gender");
                }}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* MobilePhone */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">mobilePhone</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={mobilePhone}
              disabled={!editMode.mobilePhone}
              onChange={(e) => handleChange("mpbilePhone", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.mobilePhone
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.mobilePhone ? (
              <button
                onClick={() => {
                  handleSave("mobilePhone");
                  mutate({ mobilePhone: mobilePhone });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("mobilePhone")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Facebook */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">FacebookLink</label>
          <div className="flex flex-col gap-2 sm:flex-row">
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
                onClick={() => {
                  handleSave("facebookLink");
                  mutate({ facebookLink });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("facebookLink")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Instagram */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">
            InstagramLink
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={fields.email}
              disabled={!editMode.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.instagram
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.instagram ? (
              <button
                onClick={() => handleSave("instagram")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("instagram")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Google*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Google Link</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={googleLink}
              disabled={!editMode.google}
              onChange={(e) => handleChange("google", e.target.value)}
              className={`p-3 border rounded-lg flex-1 ${
                editMode.google
                  ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            />
            {editMode.google ? (
              <button
                onClick={() => {
                  handleSave("google");
                  mutate({ googleBusiness: googleLink });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("google")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/*NiN*/}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">NIN</label>
          <div className="flex flex-col gap-2 sm:flex-row">
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
                onClick={() => {
                  handleSave("phone");
                  mutate({ NIN });
                }}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit("phone")}
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium text-gray-700">Address</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <textarea
              rows="3"
              value={officeAdress}
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
                className="px-4 py-2 text-white bg-[#144c6f] rounded-lg hover:bg-[#052031]"
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
