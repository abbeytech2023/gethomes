import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { PiNotePencilThin } from "react-icons/pi";
import { RiSave2Fill } from "react-icons/ri";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUpdateUserData } from "../hooks/useProperties";
import { useUser } from "../hooks/useUser";

const StyledFormDivBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: auto;
  /* background-color: brown; */
  /* max-width: 65rem; */
  min-width: 20rem;
  grid-gap: 3rem;
`;

const StyledFormDiv = styled.div`
  /* width: 100%; */
  display: flex;

  align-items: flex-end;

  & label {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
  }

  & input {
    border: 1px solid black;

    text-align: center;
    /* width: 90%; */
    height: 4rem;
    filter: grayscale();
    opacity: 0.6;
  }
  & select {
    border: 1px solid gray;

    height: 4rem;
    font-weight: 400;
  }
`;

const StyledContainerEditSave = styled.div`
  display: flex;
  flex-direction: column;
  right: 22px;
  /* gap: 1rem; */

  /* align-items: flex-end; */
`;

const LabelInputDiv = styled.div`
  display: flex;
  font-weight: 600;
  flex-direction: column;
  width: 14rem;
  /* background-color: green; */

  & input {
    border: 1px solid gray;
    font-weight: 400;
    /* width: 70%; */
  }

  & select {
    /* width: 70%; */
  }
`;

const ProfileFormEdit = ({ user }) => {
  // console.log(user);

  const id = user?.id;
  const { mutate } = useUpdateUserData(id);

  const [currentState, setCurrentState] = useState("");

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
      setMobilePhone(user && user.mobilePhone);
      setGoogleLink(user && user.googleLink);
      setFacebookLink(user && user.googleLink);
      setInstagramLink(user && user.googleLink);
    };
    getUserDetails();
  }, [user]);

  const formObject = [
    { label: "Email", value: email },
    { label: "FullName", value: displayName },
    { label: "NIN", value: NIN, ref: inputRefNIN },
    { label: "state", Value: state, ref: inputRefState },
    { label: "local-govt", value: localGovt, ref: inputRefLocalGovt },
    { label: "mobile-phone", value: mobilePhone, ref: inputRefMobilePhone },
    { label: "occupation", value: occupation, ref: inputRefOccupation },
    { label: "facebook-link", value: facebookLink, ref: inputRefFacebook },
    { label: "gender", value: gender, ref: inputRefGener },
    { label: "office-Adress", value: officeAdress, inputRefHomeAddress },
    { label: "Google-Link", value: googleLink, inputRefGoogleLink },
  ];

  const { handleSubmit } = useForm();

  const [disable, setDisable] = useState(true);

  // const onsubmit = ({ data }) => {
  //   // mutate({ data });
  //   console.log(data);
  // };

  let onsubmit;

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    // console.log(localGovts);
    console.log(currentState);
  };

  return (
    <form action="">
      <StyledFormDivBox>
        {formObject.map((form) => {
          const value = form.value;

          return (
            <StyledFormDiv key={form.label}>
              <LabelInputDiv className="flex flex-col ">
                <label>{form.label}</label>

                {form.label === "state" && (
                  <select
                    name="allState"
                    id="state"
                    ref={form.ref}
                    defaultValue={state}
                    className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option key="default">{user?.state}</option>
                    {allStates?.map((state, i) => {
                      return (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                )}
                {form.label === "local-govt" && (
                  <select
                    disabled
                    onChange={(e) => setLocalGovt(e.target.value)}
                    value={localGovt}
                    ref={form.ref}
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
                )}
                {form.label !== "state" && form.label !== "local-govt" && (
                  <input
                    disabled
                    defaultValue={form.value}
                    ref={form.ref}
                    className={`${
                      disable === true ? "opacity-50" : "opacity-100"
                    }`}
                  />
                )}
              </LabelInputDiv>
              <StyledContainerEditSave>
                <EditSaaveButton
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(form.ref);
                    form.ref.current.focus();
                    form.ref.current.disabled = false;
                  }}
                >
                  <PiNotePencilThin />
                </EditSaaveButton>
                <EditSaaveButton
                  onClick={(e) => {
                    e.preventDefault();
                    inputRefGener.current.disabled = true;
                    const value = form.value;
                    mutate({ value });
                    console.log(value);
                  }}
                >
                  <RiSave2Fill />
                </EditSaaveButton>
              </StyledContainerEditSave>
            </StyledFormDiv>
          );
        })}
      </StyledFormDivBox>
    </form>
  );

  // return (
  //   <form onSubmit={handleSubmit(onsubmit)}>
  //     <StyledFormDivBox>
  //       <StyledFormDiv>
  //         <LabelInputDiv className="flex flex-col ">
  //           <label>Full-name</label>
  //           <input
  //             disabled
  //             defaultValue={displayName}
  //             className={`${disable === true ? "opacity-50" : "opacity-100"}`}
  //           />
  //         </LabelInputDiv>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Email</label>
  //           <input
  //             disabled
  //             value={email}
  //             className={` border-none ${
  //               disable === true ? "opacity-50" : "opacity-100"
  //             }`}
  //           />
  //         </LabelInputDiv>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>State</label>
  //           <select
  //             name="allState"
  //             id="state"
  //             ref={inputRefState}
  //             defaultValue={state}
  //             className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
  //             onChange={(e) => setState(e.target.value)}
  //           >
  //             <option key="default">{user?.state}</option>
  //             {allStates?.map((state, i) => {
  //               return (
  //                 <option key={i} value={state}>
  //                   {state}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           {
  //             <EditSaaveButton
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 inputRefState.current.focus();
  //                 inputRefState.current.disabled = false;
  //               }}
  //             >
  //               <PiNotePencilThin />
  //             </EditSaaveButton>
  //           }
  //           {
  //             <EditSaaveButton
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 inputRefState.current.disabled = true;
  //                 mutate({ state });
  //               }}
  //             >
  //               <RiSave2Fill />
  //             </EditSaaveButton>
  //           }
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>

  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Local-Govt</label>
  //           <select
  //             onChange={(e) => setLocalGovt(e.target.value)}
  //             value={localGovt}
  //             ref={inputRefLocalGovt}
  //           >
  //             <option key="default">{user?.localGovt}</option>
  //             {localGovts?.map((lga, i) => {
  //               return (
  //                 <option key={i} value={lga}>
  //                   {lga}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefLocalGovt.current.focus();
  //               inputRefLocalGovt.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefLocalGovt.current.disabled = true;
  //               mutate({ localGovt });
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>NIN</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefNIN}
  //             onChange={(e) => setNin(e.target.value)}
  //             value={NIN}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefNIN.current.focus();
  //               inputRefNIN.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefNIN.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Gender</label>
  //           <select
  //             onChange={(e) => setgender(e.target.value)}
  //             value={gender}
  //             ref={inputRefGener}
  //           >
  //             <option value="MALE">MALE</option>
  //             <option value="FEMALE">FEMALE</option>
  //           </select>
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefGener.current.focus();
  //               inputRefGener.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefGener.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>

  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label className="">Home-Address</label>

  //           <input
  //             height="80px"
  //             disabled={disable}
  //             ref={inputRefHomeAddress}
  //             onChange={(e) => setHomeAdress(e.target.value)}
  //             value={homeAdress}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefHomeAddress.current.focus();
  //               inputRefHomeAddress.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefHomeAddress.current.disable = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Office-Address</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefOfficeAddress}
  //             value={officeAdress}
  //             onChange={(e) => setOfficeAdress(e.target.value)}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefOfficeAddress.current.focus();
  //               inputRefOfficeAddress.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefOfficeAddress.current.focus();
  //               inputRefOfficeAddress.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Occupation</label>
  //           <select
  //             className="text-[1.18rem] border-[1px] border-[#666] px-[2rem] py-[0.6rem]"
  //             onChange={(e) => setOccupation(e.target.value)}
  //             value={occupation}
  //             disabled={disable}
  //             ref={inputRefOccupation}
  //           >
  //             <option value="furniture">Furniture</option>
  //             <option value="surveyor">surveyor</option>
  //             <option value="Agents">Agent</option>
  //           </select>
  //         </LabelInputDiv>
  //         {/* <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefOccupation.current.focus();
  //               inputRefOccupation.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefOccupation.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave> */}
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Mobile</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefMobilePhone}
  //             value={mobilePhone}
  //             onChange={(e) => {
  //               setMobilePhone(e.target.value);
  //             }}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefMobilePhone.current.focus();
  //               inputRefMobilePhone.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefMobilePhone.current.disabled = true;
  //               console.log(mobilePhone);
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Google business</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefGoogleLink}
  //             value={googleLink}
  //             onChange={(e) => {
  //               setGoogleLink(e.target.value);
  //             }}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefGoogleLink.current.focus();
  //               inputRefGoogleLink.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefGoogleLink.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Facebook profile</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefFacebook}
  //             value={facebookLink}
  //             onChange={(e) => {
  //               setFacebookLink(e.target.value);
  //             }}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefFacebook.current.focus();
  //               inputRefFacebook.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefFacebook.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //       <StyledFormDiv>
  //         <LabelInputDiv>
  //           <label>Instagram</label>
  //           <input
  //             disabled={disable}
  //             ref={inputRefInstagram}
  //             value={instagramLink}
  //             onChange={(e) => {
  //               setInstagramLink(e.target.value);
  //             }}
  //           />
  //         </LabelInputDiv>
  //         <StyledContainerEditSave>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefInstagram.current.focus();
  //               inputRefInstagram.current.disabled = false;
  //             }}
  //           >
  //             <PiNotePencilThin />
  //           </EditSaaveButton>
  //           <EditSaaveButton
  //             onClick={(e) => {
  //               e.preventDefault();
  //               inputRefInstagram.current.disabled = true;
  //             }}
  //           >
  //             <RiSave2Fill />
  //           </EditSaaveButton>
  //         </StyledContainerEditSave>
  //       </StyledFormDiv>
  //     </StyledFormDivBox>
  //   </form>
  // );
};

export default ProfileFormEdit;

function EditSaaveButton({ onClick, children }) {
  return (
    <div className="">
      <button
        onClick={onClick}
        className="text-[0.7rem]  text-[#000]    rounded-lg py-1 px-1"
      >
        {children}
      </button>
    </div>
  );
}
