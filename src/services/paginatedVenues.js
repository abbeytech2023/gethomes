import { useEffect, useState } from "react";
import supabase from "./supabaseClients";

export default function PaginatedVenues() {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVenues();
  }, [currentPage]);

  async function fetchVenues() {
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data, error, count } = await supabase
      .from("Venues")
      .select("*", { count: "exact" }) // count gives total number of rows
      .range(from, to);

    if (error) console.error(error);
    else {
      setVenues(data);
      setTotalCount(count);
    }
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="mt-8">
      {/* Venues list */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            <img
              src={venue.image1}
              alt={venue.name}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold">{venue.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {venue.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "hover:bg-blue-600 hover:text-white border-gray-300"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200"
              : "hover:bg-blue-600 hover:text-white border-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
