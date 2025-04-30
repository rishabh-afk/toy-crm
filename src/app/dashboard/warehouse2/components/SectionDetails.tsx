"use client";

import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { FaPlusCircle } from "react-icons/fa";

interface SectionDetailsProps {
  name: string;
  color: string;
  onClose: () => void;
  compartments: string[];
  onAddCompartment: () => void;
}

const SectionDetails: React.FC<SectionDetailsProps> = ({
  name,
  color,
  onClose,
  compartments,
  onAddCompartment,
}) => {
  const [activeCompartment, setActiveCompartment] = useState<string | null>(
    null
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${color} text-white relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white/90 hover:text-white text-2xl z-10"
          aria-label="Close section details"
        >
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-4xl font-extrabold mb-2">
            Section {name} Overview
          </h2>
          <p className="mb-6 text-white/90 w-3/4">
            Click a compartment to manage its products.
          </p>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Compartments</h3>
            {compartments.length === 0 ? (
              <p className="italic text-white/80">
                No compartments available yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 pr-2">
                {compartments.map((comp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCompartment(comp)}
                    className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:bg-white/30 transition"
                  >
                    {comp}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onAddCompartment}
            className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 font-semibold text-sm px-5 py-3 rounded-full transition duration-200"
          >
            <FaPlusCircle className="text-blue-600" /> Add Compartment
          </button>
        </div>
      </div>

      {/* Compartment Product Modal */}
      {activeCompartment && (
        <ProductModal
          compartmentName={activeCompartment}
          onClose={() => setActiveCompartment(null)}
        />
      )}
    </div>
  );
};

export default SectionDetails;
