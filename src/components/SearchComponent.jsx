import React, { useState } from "react";

import { useSearchContext } from "../hooks/useSearchContext";

function SearchInput() {
  const { query, setQuery } = useSearchContext();

  return (
    <div className="w-[60%] border-[1px]  rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by state, address or city..."
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
}

export default SearchInput;

// SearchInput.jsx

// export default function SearchInput() {
//   const { query, setQuery } = useSearchContext();

//   return (
//     <input
//       type="text"
//       placeholder="Search by state..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       className="w-full p-2 mb-4 text-center border rounded"
//     />
//   );
// }
