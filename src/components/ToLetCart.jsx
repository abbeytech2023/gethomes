import { MdDelete, MdDialerSip } from "react-icons/md";
// import { GridContainer, GridInner } from "./Grid";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";

export const ToLetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  max-width: 80rem;
  margin: 0 auto;
`;

export const StyledDivProperty = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  gap: 1rem;
  background-color: rgba(99, 124, 197, 0.277);
  text-align: center;
  box-shadow: 3px 3px 8px rgba(85, 85, 85, 0.487);
  margin-bottom: 6rem;
  padding: 2rem;
  max-width: 35rem;
  /* width: 28rem; */

  > div img {
    /* width: 100%;
    height: 100%; */
  }
`;
export const StyledImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPropertyDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: center;
  gap: 3.5;
  height: 16rem;
  width: 9rem;
  /* width: 55%; */
`;

//flex flex-col justify-around  h-full

export const StyledPropertyDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const ToLetCart = ({ documents }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const URL = location.pathname;
  const { user } = useUser();

  const deleteCart = location.pathname === "/myaccount/dashboard";

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),

    onSuccess: () => {
      toast.success("cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["ToLet"],
      });
    },
    onError: () => toast.error("property could not be deleted"),
  });

  return (
    <>
      <ToLetContainer>
        {documents &&
          documents.map((doc) => {
            return (
              <StyledDivProperty
                key={doc.id}
                className="border-[#144c6f]  flex min-[0px]:flex-col max-[600px]:mx-[1.4rem]  md:flex-row items-center lg:flex-row xl:flex-row "
              >
                <StyledImageBox>
                  {deleteCart && (
                    <button onClick={() => mutate(doc.id)}>
                      <MdDelete />
                    </button>
                  )}
                  <img
                    src={doc.image}
                    height="200px"
                    width="150px"
                    className="property-image"
                    alt=""
                  />
                </StyledImageBox>
                <StyledPropertyDescription>
                  <p className="text-[1.3rem] font-medium ">
                    {doc.propertyDescription}
                  </p>
                  <p>{doc.propertyLocation}</p>
                </StyledPropertyDescription>
                <StyledPropertyDetails>
                  <div className="w-[30%] ">{doc.phoneNumber}</div>
                  <button
                    onClick={() => {
                      navigate(`${URL}/${doc.id}`);
                    }}
                    className="font-medium text-[17px]"
                  >
                    see more...
                  </button>
                </StyledPropertyDetails>
              </StyledDivProperty>
            );
          })}
      </ToLetContainer>
    </>
  );
};
