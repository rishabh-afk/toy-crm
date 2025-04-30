"use client";

import React, { useState } from "react";
import ProductModal from "./ProductModal";
import ConfirmModal from "./ConfirmModal";
import { FaPlus, FaTimes } from "react-icons/fa";

interface SectionDetailsProps {
  name: string;
  color: string;
  onClose: () => void;
  compartments: string[];
  onAddCompartment: () => void;
  onDeleteCompartment: (compartment: string) => void;
}

const SectionDetails: React.FC<SectionDetailsProps> = ({
  name,
  color,
  onClose,
  compartments,
  onAddCompartment,
  onDeleteCompartment,
}) => {
  const [activeCompartment, setActiveCompartment] = useState<string | null>(
    null
  );
  const [toDelete, setToDelete] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br ${color} text-white relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white/90 hover:text-white text-2xl z-10"
          aria-label="Close section details"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-4xl font-extrabold mb-2">
            Section {name} Overview
          </h2>
          <p className="mb-6 text-white/90 italic">
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
                  <div
                    key={idx}
                    onClick={() => setActiveCompartment(comp)}
                    className="relative group bg-white/20 cursor-pointer backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:bg-white/30 transition"
                  >
                    <button className="text-white pr-4">{comp}</button>
                    <button
                      onClick={() => setToDelete(comp)}
                      className="absolute -top-1 -right-1 bg-white text-red-600 p-1 rounded-full text-[10px] hover:bg-red-600 hover:text-white transition"
                      aria-label="Delete compartment"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onAddCompartment}
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 border border-gray-300 font-medium text-sm px-5 py-2.5 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus className="text-blue-600 text-sm" />
            Add Compartment
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

      {/* Confirm Delete Modal */}
      {toDelete && (
        <ConfirmModal
          cancelText="Cancel"
          confirmText="Yes, Delete"
          title="Delete Compartment"
          onCancel={() => setToDelete(null)}
          isOpen={toDelete ? true : false}
          onConfirm={() => {
            onDeleteCompartment(toDelete);
            setToDelete(null);
          }}
          description={`Are you sure you want to delete the compartment "${toDelete}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default SectionDetails;
