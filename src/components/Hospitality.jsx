import { useState } from "react";
import { ChevronDown } from "lucide-react"; // optional for dropdown arrow icon
import { Link } from "react-router-dom";

export default function HospitalityButton({ children, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // onClick={(open) => setOpen(!open)}
    >
      {/* Button */}
      <button className="flex items-center gap-2 px-5 py-2 text-white transition ">
        {children}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 z-50 w-48 mt-2 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg animate-fadeIn">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="block px-4 py-2 text-gray-700 transition hover:bg-blue-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
