import { useState, useEffect } from "react";

export default function PropertyPage() {
  // Sample property data
  const properties = [
    {
      id: 1,
      address: "12 Allen Avenue",
      city: "Ikeja",
      state: "Lagos",
      price: 25000000,
    },
    {
      id: 2,
      address: "5 Garki Road",
      city: "Garki",
      state: "Abuja",
      price: 32000000,
    },
    {
      id: 3,
      address: "23 Oke Mosan Street",
      city: "Abeokuta",
      state: "Ogun",
      price: 18000000,
    },
    {
      id: 4,
      address: "45 Victoria Island",
      city: "Lagos Island",
      state: "Lagos",
      price: 42000000,
    },
    {
      id: 5,
      address: "10 Airport Road",
      city: "Maitama",
      state: "Abuja",
      price: 35000000,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filtered, setFiltered] = useState(properties);

  useEffect(() => {
    let results = properties;

    // State filter
    if (selectedState) {
      results = results.filter(
        (p) => p.state.toLowerCase() === selectedState.toLowerCase()
      );
    }

    // Search filter (address or city)
    if (searchQuery) {
      results = results.filter(
        (p) =>
          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(results);
  }, [searchQuery, selectedState, properties]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Property Listings</h1>

      {/* Filters Row */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by address or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm"
        />

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm md:w-60"
        >
          <option value="">All States</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Ogun">Ogun</option>
        </select>
      </div>

      {/* Properties List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              className="p-4 transition bg-white shadow rounded-xl hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{p.address}</h2>
              <p className="text-gray-600">
                {p.city}, {p.state}
              </p>
              <p className="mt-2 font-bold text-green-600">
                ₦{p.price.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No properties found
          </p>
        )}
      </div>
    </div>
  );
}
