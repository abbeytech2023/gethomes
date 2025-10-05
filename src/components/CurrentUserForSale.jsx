import { useUser } from "../hooks/useUser";
import { motion } from "framer-motion";
import { Heading } from "./HeadingText";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";
import { useFetchPropertiesForSaleCurrentUser } from "../hooks/useProperties";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";
import { useEffect, useState } from "react";
import { formatPrice } from "../utility/utility";

export default function CurrentUserForSale() {
  const [documentSale, setDocumentSale] = useState();
  const { user } = useUser();
  const id = user?.id;

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const { data } = useFetchPropertiesForSaleCurrentUser(id);
  const { documents, isLoading } = useFetchPropertiesWithId("ForSale", id);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),

    onSuccess: () => {
      toast.success("cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["ForSale"],
      });
    },
    onError: () => toast.error("property could not be deleted"),
  });

  useEffect(() => {
    setDocumentSale(documents);
  }, [documents]);

  console.log(documentSale);

  const handleDelete = (id) => {
    mutate(id);
    // setDocumentSale((doc) => doc?.id !== id);
  };

  isLoading && <SpinnerMini />;

  return (
    <>
      <Heading as="h2" className="text-center uppercase ">
        your Properties for sale
      </Heading>
      {!documentSale && <SpinnerMini />}
      {documents?.length === 0 && (
        <p className="text-[1.16rem] text-center uppercase">
          You do not have a property listed for sale
        </p>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="grid items-center justify-center gap-12 text-center sm:grid-cols-2 lg:grid-cols-3">
          {documentSale &&
            documentSale.map((property) => (
              <div
                key={property.id}
                className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="object-cover w-full h-52"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{property.title}</h2>
                  <p className="text-gray-600">
                    {property.address.slice(0, 30) + "..."}
                  </p>
                  <p className="mt-2 font-bold text-[#144c6f]">
                    {formatPrice(property.price)}
                  </p>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="w-full py-2 mt-4 text-white cursor-pointer transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </>
  );
}
