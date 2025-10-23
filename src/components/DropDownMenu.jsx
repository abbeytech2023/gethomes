import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export function DropDownMenu({ children, items }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left cursor-pointer"
    >
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full gap-2 px-5 py-2 text-white transition rounded-lg sm:w-auto"
      >
        {children}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Animated Dropdown */}
      <div
        className={`absolute left-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 transition-all duration-300 ease-out origin-top transform ${
          open
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-95 -translate-y-2 invisible"
        } before:content-[''] before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-white`}
      >
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="block px-5 py-2 text-gray-700 transition rounded-md hover:bg-blue-50 hover:text-blue-600"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

import { X } from "lucide-react";

export function MobileDropDownMenu({ children, items }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative block ">
      {/* Main button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-5 text-lg font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {children}
        {open ? (
          <X className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <ChevronDown className="w-5 h-5 transition-transform duration-300" />
        )}
      </button>

      {/* Slide-down menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl border-t border-gray-200 overflow-hidden transition-all duration-300 z-50 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-base text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
