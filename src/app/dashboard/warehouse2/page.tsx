"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import SectionDetails from "./components/SectionDetails";

/**
 * Represents a compartment inside a warehouse section.
 * Example: A1, B2, etc.
 */
type Compartment = string;

/**
 * Represents a single warehouse section.
 * Each section has a name (A, B, C...), a list of compartments, and a color gradient.
 */
interface Section {
  name: string;
  compartments: Compartment[];
  color: string;
}

/**
 * Converts a number to alphabetical format like Excel columns:
 * 0 => A, 25 => Z, 26 => AA, 27 => AB, ...
 */
const getSectionName = (index: number): string => {
  let name = "";
  while (index >= 0) {
    name = String.fromCharCode((index % 26) + 65) + name;
    index = Math.floor(index / 26) - 1;
  }
  return name;
};

/**
 * Returns a random Tailwind CSS gradient string.
 * Used to visually differentiate warehouse sections.
 */
const getRandomGradient = (): string => {
  const gradients = [
    "from-pink-500 to-yellow-500", // Pink to Yellow
    "from-purple-500 to-indigo-500", // Purple to Indigo
    "from-green-400 to-blue-500", // Green to Blue
    "from-yellow-400 to-red-500", // Yellow to Red
    "from-cyan-500 to-blue-600", // Cyan to Blue
    "from-teal-400 to-green-600", // Teal to Green
    "from-orange-400 to-yellow-500", // Orange to Yellow
    "from-red-500 to-pink-600", // Red to Pink
    "from-blue-400 to-indigo-700", // Blue to Indigo
    "from-lime-400 to-cyan-500", // Lime to Cyan
    "from-gray-600 to-gray-900", // Dark Gray Gradient
    "from-purple-700 to-blue-900", // Purple to Blue
    "from-blue-400 to-pink-500", // Blue to Pink
    "from-green-500 to-yellow-500", // Green to Yellow
    "from-indigo-500 to-purple-600", // Indigo to Purple
    "from-red-600 to-orange-600", // Red to Orange
    "from-pink-600 to-teal-500", // Pink to Teal
    "from-indigo-600 to-pink-400", // Indigo to Pink
    "from-fuchsia-500 to-rose-500", // Fuchsia to Rose
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

/**
 * WarehousePage displays a dynamic grid layout of warehouse sections and their compartments.
 * Users can add new sections and compartments interactively.
 */
export default function WarehousePage() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([
    { name: "A", compartments: ["A1", "A2"], color: getRandomGradient() },
  ]);

  /**
   * Adds a new warehouse section (e.g., B, C, D...) with a unique gradient color.
   */
  const addSection = () => {
    const nextIndex = sections.length;
    const nextName = getSectionName(nextIndex);
    setSections([
      ...sections,
      { name: nextName, compartments: [], color: getRandomGradient() },
    ]);
  };

  /**
   * Adds a new compartment to the specified section index.
   * Compartment is named sequentially, e.g., A3, B1, etc.
   *
   * @param index Index of the section to add the compartment to
   */
  const addCompartment = (index: number) => {
    const updatedSections = [...sections];
    const section = updatedSections[index];
    const newCompartment: Compartment = `${section.name}${
      section.compartments.length + 1
    }`;
    section.compartments.push(newCompartment);
    setSections(updatedSections);
  };

  return (
    <AuthGuard>
      <Wrapper>
        <h1 className="text-4xl font-extrabold text-center mb-2 text-iconBlack leading-tight">
          Warehouse Storage Layout Overview
        </h1>
        <p className="text-lg text-iconBlack w-2/3 mx-auto text-center mb-8">
          Explore the detailed layout of our warehouse, including sections and
          compartments, designed for optimized space and organization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedSection(index)}
              transition={{ duration: 0.1, ease: "linear" }}
              className={`rounded-2xl cursor-pointer p-5 w-full transition-all duration-300 bg-gradient-to-br ${section.color} text-white`}
              aria-label={`Warehouse Section ${section.name}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  Section {section.name}
                </h2>
                <button
                  onClick={() => addCompartment(index)}
                  title={`Add a new compartment to section ${section.name}`}
                  aria-label={`Add Compartment to ${section.name}`}
                >
                  <FaPlusCircle className="w-6 h-6 relative z-50 hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {section.compartments.length === 0 ? (
                  <p className="italic text-white/80">
                    This section currently has no compartments.
                  </p>
                ) : (
                  <>
                    {section.compartments.slice(0, 3).map((comp, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                        aria-label={`Compartment ${comp}`}
                      >
                        {comp}
                      </span>
                    ))}
                    {section.compartments.length > 3 && (
                      <span className="text-white/80 text-sm">
                        +{section.compartments.length - 3} more
                      </span>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, ease: "linear" }}
            onClick={addSection}
            title="Add a new warehouse section (A, B, C...)"
            aria-label="Add New Section"
            className="rounded-2xl border-dashed border-2 border-gray-400 text-gray-500 hover:text-black hover:border-black p-6 w-full flex flex-col items-center justify-center text-center"
          >
            <FaPlusCircle className="w-8 h-8 mb-2" />
            <span className="font-semibold">
              Click to add a new section
              <br />
              (e.g., A, B, C...)
            </span>
          </motion.button>
        </div>
        {/* Section Details Modal */}
        {selectedSection !== null && (
          <SectionDetails
            name={sections[selectedSection].name}
            color={sections[selectedSection].color}
            compartments={sections[selectedSection].compartments}
            onClose={() => setSelectedSection(null)}
            onAddCompartment={() => {
              addCompartment(selectedSection);
            }}
          />
        )}
      </Wrapper>
    </AuthGuard>
  );
}
