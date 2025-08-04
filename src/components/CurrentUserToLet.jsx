import { StyledDivProperty, ToLetCart, ToLetContainer } from "./ToLetCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiToLet";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../hooks/useUser";
import { Heading } from "./HeadingText";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useFetchPropertiesToletCurrentUser } from "../hooks/useProperties";

const deleteCart = location.pathname === "/myaccount/dashboard";

export default function CurrentUserToLet() {
  const { user } = useUser();
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
                  className="border-[#144c6f] flex min-[0px]:flex-col md:flex-row lg:flex-row xl:flex-row "
                >
                  <div className="">
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
                  </div>
                  <div className="flex gap-3.5 w-[35%]  flex-col  px-2 py-4">
                    <p className="text-2xl font-medium">
                      {doc.propertyDescription}
                    </p>
                    <p>{doc.propertyLocation}</p>
                  </div>
                  <div>
                    <div className="w-[30%] ">{doc.phoneNumber}</div>
                  </div>
                </StyledDivProperty>
              );
            })}
        </ToLetContainer>
      </>
    </div>
  );
}
