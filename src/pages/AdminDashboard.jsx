import React, { useState } from "react";

const AdminDashboard = () => {
  const [tab, setTab] = useState("sale");

  const [propertiesForSale, setPropertiesForSale] = useState([
    { id: 1, title: "Luxury Villa", price: "$250,000", location: "Lagos" },
    { id: 2, title: "Modern Duplex", price: "$180,000", location: "Abuja" },
  ]);

  const [propertiesToLet, setPropertiesToLet] = useState([
    {
      id: 1,
      title: "2 Bedroom Apartment",
      price: "$700/mo",
      location: "Ibadan",
    },
    { id: 2, title: "Studio Flat", price: "$500/mo", location: "Lagos" },
  ]);

  const [registeredUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Agent" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Buyer" },
  ]);

  // Form States
  const [saleForm, setSaleForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  const [letForm, setLetForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  // Handlers
  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setSaleForm({ ...saleForm, [name]: value });
  };

  const handleLetChange = (e) => {
    const { name, value } = e.target;
    setLetForm({ ...letForm, [name]: value });
  };

  const handleAddSaleProperty = (e) => {
    e.preventDefault();
    if (!saleForm.title || !saleForm.price || !saleForm.location) return;
    const newProperty = { id: Date.now(), ...saleForm };
    setPropertiesForSale([newProperty, ...propertiesForSale]);
    setSaleForm({ title: "", price: "", location: "", description: "" });
  };

  const handleAddLetProperty = (e) => {
    e.preventDefault();
    if (!letForm.title || !letForm.price || !letForm.location) return;
    const newProperty = { id: Date.now(), ...letForm };
    setPropertiesToLet([newProperty, ...propertiesToLet]);
    setLetForm({ title: "", price: "", location: "", description: "" });
  };

  const renderSaleSection = () => (
    <div>
      {/* Add Sale Form */}
      <form
        onSubmit={handleAddSaleProperty}
        className="p-5 mb-6 bg-white border shadow-sm rounded-2xl"
      >
        <h2 className="mb-3 text-xl font-semibold text-green-700">
          Add Property For Sale
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="title"
            value={saleForm.title}
            onChange={handleSaleChange}
            placeholder="Property Title"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="price"
            value={saleForm.price}
            onChange={handleSaleChange}
            placeholder="Price (e.g. $200,000)"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="location"
            value={saleForm.location}
            onChange={handleSaleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            value={saleForm.description}
            onChange={handleSaleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-3 mt-5 text-white transition bg-green-600 rounded-lg sm:w-auto hover:bg-green-700"
        >
          Add Property
        </button>
      </form>

      {/* Sale List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {propertiesForSale.map((p) => (
          <div
            key={p.id}
            className="p-4 transition border shadow-sm rounded-xl hover:shadow-md bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-gray-500">{p.location}</p>
            <p className="font-medium text-green-600">{p.price}</p>
            {p.description && (
              <p className="mt-1 text-sm text-gray-600">{p.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderToLetSection = () => (
    <div>
      {/* Add To-Let Form */}
      <form
        onSubmit={handleAddLetProperty}
        className="p-5 mb-6 bg-white border shadow-sm rounded-2xl"
      >
        <h2 className="mb-3 text-xl font-semibold text-blue-700">
          Add Property To-Let
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="title"
            value={letForm.title}
            onChange={handleLetChange}
            placeholder="Property Title"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="price"
            value={letForm.price}
            onChange={handleLetChange}
            placeholder="Rent (e.g. $800/mo)"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="location"
            value={letForm.location}
            onChange={handleLetChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            value={letForm.description}
            onChange={handleLetChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-3 mt-5 text-white transition bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>

      {/* To-Let List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {propertiesToLet.map((p) => (
          <div
            key={p.id}
            className="p-4 transition border shadow-sm rounded-xl hover:shadow-md bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-gray-500">{p.location}</p>
            <p className="font-medium text-blue-600">{p.price}</p>
            {p.description && (
              <p className="mt-1 text-sm text-gray-600">{p.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="mt-4 overflow-x-auto bg-white border shadow-sm rounded-2xl">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">Name</th>
            <th className="p-3 text-left border">Email</th>
            <th className="p-3 text-left border">Role</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border">{u.name}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl p-4 mx-auto mt-32 sm:p-6">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        🏘️ Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setTab("sale")}
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            tab === "sale"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Properties for Sale
        </button>
        <button
          onClick={() => setTab("tolet")}
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            tab === "tolet"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Properties To-Let
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            tab === "users"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Registered Users
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {tab === "sale" && renderSaleSection()}
        {tab === "tolet" && renderToLetSection()}
        {tab === "users" && renderUsers()}
      </div>
    </div>
  );
};

export default AdminDashboard;
