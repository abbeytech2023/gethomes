import { useState } from "react";
import { nigeriaData } from "../utility/stateLocalGovt";

export default function StateLgaSelect() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const states = Object.keys(nigeriaData);
  const lgas = selectedState ? nigeriaData[selectedState] : [];
  return (
    <div className="space-y-3">
      <div>
        <label className="block mb-1 font-semibold">State</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedLga("");
          }}
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Local Government Area
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedLga}
          onChange={(e) => setSelectedLga(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select LGA</option>
          {lgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
