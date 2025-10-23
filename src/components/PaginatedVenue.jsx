import { useState, useEffect } from "react";
import supabase from "../services/supabaseClients";
import { Link } from "react-router-dom";

export default function VenuesList() {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = location.pathname;

  const itemsPerPage = 5;

  useEffect(() => {
    fetchVenues();
  }, [currentPage, selectedState, searchTerm]);

  async function fetchVenues() {
    setLoading(true);
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("Venues")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(from, to);

    if (selectedState) query = query.eq("state", selectedState);
    if (searchTerm.trim() !== "")
      query = query.or(
        `name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      );

    const { data, error, count } = await query;
    if (error) console.error("Error fetching venues:", error.message);
    else {
      setVenues(data);
      setTotalCount(count);
    }
    setLoading(false);
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const states = [
    "Lagos",
    "Abuja",
    "Oyo",
    "Ogun",
    "Kano",
    "Rivers",
    "Kaduna",
    "Enugu",
  ];

  return (
    <div className="max-w-6xl px-4 mx-auto mt-10">
      {/* Header & Controls */}
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-bold text-center sm:text-left">Venues</h2>

        <div className="flex flex-col items-center w-full gap-3 sm:flex-row sm:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none sm:w-64 focus:ring-2 focus:ring-blue-500"
          />

          {/* State Filter */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none sm:w-auto focus:ring-2 focus:ring-blue-500"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <p className="py-10 text-center text-gray-500">Loading venues...</p>
      )}

      {/* Venues Grid */}
      {!loading && venues.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <Link
              to={`${URL}/${venue.id}`}
              key={venue.id}
              className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <img
                src={venue.image || "/placeholder.jpg"}
                alt={venue.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold">{venue.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {venue.description}
                </p>
                <p className="mt-2 text-sm font-medium text-blue-600">
                  📍 {venue.state}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && venues.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No venues found for {searchTerm} in {selectedState || "all states"}.
        </p>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
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
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-2 rounded-lg text-sm sm:text-base ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200"
                : "hover:bg-blue-600 hover:text-white border-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
