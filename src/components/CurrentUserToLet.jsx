import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiToLet";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../hooks/useUser";
import { Heading } from "./HeadingText";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useFetchPropertiesToletCurrentUser } from "../hooks/useProperties";

import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utility/utility";

const deleteCart = location.pathname === "/myaccount/dashboard";

export default function CurrentUserToLet() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const id = user?.id;

  const { documents, isLoading, error } = useFetchPropertiesWithId("ToLet", id);

  const documentReversed = documents?.reverse() || [];

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
      {!documentReversed && <SpinnerMini />}
      {documentReversed?.length === 0 && (
        <p className="text-[1.16rem] uppercase">
          You do not have a property listed to let
        </p>
      )}
      {/* <div>{documents && <ToLetCart documents={documents} />}</div> */}
      <>
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
                        handleDelete(doc.id);
                      }}
                      className="w-full py-2 mt-4 text-white cursor-pointer transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </>
    </div>
  );
}
