import React, { useState, useEffect } from "react";
import { useFetchVenues } from "../hooks/useVenues";
import VenuesList from "../components/PaginatedVenue";

export default function VenuesPage() {
  const { venues } = useFetchVenues();
  // console.log(data);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredVenues = venues?.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || venue.location === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <section className="relative h-[70vh] mt-16 flex items-center justify-center text-center text-white overflow-hidden rounded-b-2xl mb-10">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1620735692151-26a7e0748429?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50JTIwdmVudWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"
          alt="Venue background"
          className="absolute inset-0 object-cover w-full h-full brightness-50"
        />

        {/* Overlay content */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="mb-4 text-5xl font-bold drop-shadow-lg">
            Discover Amazing Venues
          </h1>
          <p className="mb-8 text-lg opacity-90">
            Explore top event spaces, halls, and outdoor venues for your next
            occasion.
          </p>

          {/* <div className="flex flex-wrap justify-center gap-3">
            <input
              type="text"
              placeholder="Search venues..."
              className="w-64 px-4 py-3 border-[#fff] border-[1px] text-gray-900 rounded-lg outline-none"
            />
            <button className="px-6 py-3 font-semibold transition bg-blue-600 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div> */}
        </div>

        {/* Optional overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </section>
      <VenuesList />
    </>
  );
}
