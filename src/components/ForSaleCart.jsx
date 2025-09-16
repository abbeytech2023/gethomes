import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { formatPrice } from "../utility/utility";
// import { useDeleteMutateForSale } from "../hooks/useDeleteMutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";

import { GridInner } from "./Grid";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef } from "react";

function ForSaleCart({ document }) {
  const { propertyDetails, price, title, id: propertyId } = document;
  const location = useLocation();
  const navigate = useNavigate();
  const URL = location.pathname;
  const productRef = useRef(null);
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const QueryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      QueryClient.invalidateQueries({
        queryKey: ["ForSale"],
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
          <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-3">
            {document?.map((property) => (
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
                    onClick={() => {
                      navigate(`${URL}/${property.id}`);
                    }}
                    className="w-full py-2 mt-4 text-white cursor-pointer transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ForSaleCart;
