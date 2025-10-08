import { useState } from "react";
import PropertiesForSale from "../components/PropertiesForSale";
import PropertiesToLet from "../components/PropertiesToLet";
import PropertyToLetForm from "../components/PropertiesToLetForm";
import ProductSaleForm from "../components/ProductSaleForm";
import { useFetchAllUsers } from "../hooks/useFetchUsers";

const AdminDashboard = () => {
  const [tab, setTab] = useState("sale");
  const { allUser } = useFetchAllUsers();
  console.log(allUser);

  // Handlers

  const renderSaleSection = () => (
    <div className="mb-18">
      {/* Add Sale Form */}
      <div className="w-full bg-[#fffbfb]">
        <ProductSaleForm />
      </div>

      {/* Sale List */}

      <div className="mt-35 ">
        <PropertiesForSale />
      </div>
    </div>
  );

  const renderToLetSection = () => (
    <div className="mb-32">
      {/* Add To-Let Form */}

      <div className="border-[1px] w-full  px-7">
        <PropertyToLetForm />
      </div>

      {/* To-Let List */}
      <div className="mt-35">
        <PropertiesToLet />
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
            <th className="p-3 text-left border">Profession</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border">{u.displayName}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border">{u.is_admin}</td>
              <td className="p-3 border">{u.profession}</td>
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
              ? "bg-[#144c6f] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Properties for Sale
        </button>
        <button
          onClick={() => setTab("tolet")}
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            tab === "tolet"
              ? "bg-[#144c6f] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Properties To-Let
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            tab === "users"
              ? "bg-[#144c6f] text-white"
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
