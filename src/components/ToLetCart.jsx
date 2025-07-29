import { MdDelete, MdDialerSip } from "react-icons/md";
// import { GridContainer, GridInner } from "./Grid";
// import { useDeleteMutateToLets } from "../hooks/useDeleteMutate";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const ToLetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 70rem;
  margin: 0 auto;
`;

export const StyledDivProperty = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  box-shadow: 3px 3px 8px rgba(85, 85, 85, 0.487);
  margin-bottom: 6rem;
  padding: 2rem;
  max-width: 25rem;

  > div img {
    width: 100%;
    height: 100%;
  }
`;

export const ToLetCart = ({ documents }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const URL = location.pathname;
  const { user } = useUser();

  console.log(user);

  return (
    <ToLetContainer>
      {documents &&
        documents.map((doc) => {
          console.log(doc.uid);

          return (
            <StyledDivProperty
              key={doc.id}
              className="border-[#144c6f] flex min-[0px]:flex-col md:flex-row lg:flex-row xl:flex-row "
              onClick={() => {
                navigate(`${URL}/${doc.id}`);
              }}
            >
              <div className="  ">
                <img
                  src={doc.image}
                  height="100px"
                  width="200px"
                  className="property-image"
                  alt=""
                />
              </div>
              <div className="flex gap-3.5 w-[35%]  flex-col  px-2 py-4">
                <p className="text-2xl font-medium">
                  {doc.propertyDescription}
                </p>
                <p>{doc.propertyLocation}</p>
              </div>
              <div className="w-[30%] ">{doc.phoneNumber}</div>
            </StyledDivProperty>
          );
        })}
    </ToLetContainer>
  );
};
