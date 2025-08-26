import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiToLet";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../hooks/useUser";
import { Heading } from "./HeadingText";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useFetchPropertiesToletCurrentUser } from "../hooks/useProperties";
import {
  StyledDivProperty,
  ToLetContainer,
  StyledImageBox,
  StyledPropertyDescription,
  StyledPropertyDetails,
} from "./ToLetCart";
import { useNavigate } from "react-router-dom";

const deleteCart = location.pathname === "/myaccount/dashboard";

export default function CurrentUserToLet() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const id = user?.id;
  const { data } = useFetchPropertiesToletCurrentUser(id);

  const { documents, isLoading, error } = useFetchPropertiesWithId("ToLet", id);

  console.log(documents);

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),

    onSuccess: () => {
      toast.success("property successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["ToLet"],
      });
    },
    onError: () => toast.error("property could not be deleted"),
  });

  const handleDelete = (id) => {
    mutate(id);
  };
  return (
    <div className="text-center ">
      <Heading as="h2">your properties to let</Heading>
      {!documents && <SpinnerMini />}
      {documents?.length === 0 && (
        <p className="uppercase text-2xl">
          You do not have a property listed to let
        </p>
      )}
      {/* <div>{documents && <ToLetCart documents={documents} />}</div> */}
      <>
        <ToLetContainer>
          {documents &&
            documents.map((doc) => {
              return (
                <StyledDivProperty
                  key={doc.id}
                  className="border-[#144c6f]  flex min-[0px]:flex-col min-[600px]:w-[25rem] min-[0]:w-[16rem] xl:w-[30rem] lg:w-[22rem]  md:flex-row items-center lg:flex-row xl:flex-row "
                >
                  <StyledImageBox>
                    {deleteCart && (
                      <button onClick={() => mutate(doc.id)}>
                        <MdDelete className="text-black" />
                      </button>
                    )}
                    <img
                      src={doc.image}
                      height="100px"
                      width="200px"
                      className="property-image"
                      alt=""
                    />
                  </StyledImageBox>
                  <StyledPropertyDescription>
                    <p className="text-[1.3rem] font-medium">
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
    </div>
  );
}
