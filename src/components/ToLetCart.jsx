import { motion } from "framer-motion";
// import { GridContainer, GridInner } from "./Grid";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";
import { formatPrice } from "../utility/utility";
import { useEffect, useRef } from "react";

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
  text-align: left;
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
  const productRef = useRef(null);
  const deleteCart = location.pathname === "/myaccount/dashboard";
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

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

  useEffect(() => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={productRef}>
      <div className="px-4 py-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {documents?.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
                >
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">
                      {doc.propertyDescription.slice(0, 45)}
                    </h2>
                    <p className="text-gray-600">{doc.state}</p>
                    <p className="mt-2 font-bold text-[#144c6f]">
                      {formatPrice(doc.price)}
                    </p>
                    <button
                      onClick={() => {
                        navigate(`${URL}/${doc.id}`);
                      }}
                      className="w-full py-2 mt-4 text-white cursor-pointer transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* <ToLetContainer> */}
      {/* {documents &&
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
                    {doc.propertyLocation}
                  </p>
                  <p
                    onClick={() => {
                      console.log(doc.propertyDescription);
                    }}
                  >
                    {doc.propertyDescription.slice(0, 85) + "..."}
                  </p>
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
          })} */}
      {/* </ToLetContainer> */}
    </section>
  );
};
