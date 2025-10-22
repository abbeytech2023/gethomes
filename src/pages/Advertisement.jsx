// import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://YOUR_SUPABASE_URL.supabase.co";
// const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function VenueList() {
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("venues")
//           .select("*")
//           .limit(10);

//         if (error) throw error;
//         setVenues(data);
//       } catch (err) {
//         console.error("Error fetching venues:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenues();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-600">Loading venues...</p>
//       </div>
//     );
//   }

//   if (venues.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-500">No venues available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 md:p-10">
//       <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
//         Available Venues
//       </h2>

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {venues.map((venue) => (
//           <div
//             key={venue.id}
//             className="p-4 transition bg-white shadow-md rounded-2xl hover:shadow-lg"
//           >
//             <img
//               src={venue.image_url || "/placeholder.jpg"}
//               alt={venue.name}
//               className="object-cover w-full h-48 mb-4 rounded-xl"
//             />
//             <h3 className="text-lg font-semibold text-gray-700">
//               {venue.name}
//             </h3>
//             <p className="mt-2 text-sm text-gray-500 line-clamp-3">
//               {venue.description || "No description provided."}
//             </p>
//             <p className="mt-3 font-medium text-indigo-600">
//               📍 {venue.location || "Unknown Location"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useFetchVenues } from "../hooks/useVenues";
import VenuesPagination from "../components/PaginatedVenue";
import HospitalityButton from "../components/Hospitality";
export default function VenueList() {
  const { venues } = useFetchVenues();
  // console.log(data);

  // const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Simulate loading
  // useEffect(() => {
  //   setTimeout(() => setVenues(localVenues), 500);
  // }, []);

  // Filter and search logic
  const filteredVenues = venues?.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || venue.location === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Available Venues
      </h2>

      {/* Venues Grid */}
      <VenuesPagination />
    </div>
  );
}
