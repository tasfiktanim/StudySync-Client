import React from "react";
import { FaDownload, FaCalculator, FaEdit, FaChartBar, FaFlask } from "react-icons/fa";

const NotesBanner = () => {
  return (
    <div className="bg-[#0B0B1E] rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 text-white max-w-7xl mx-auto">
      
      {/* Left Side Text */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
          Need top teacher-prepared class notes and<br /> lecture sheets?
        </h2>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
          <FaDownload className="text-lg" />
          Download for Free
        </button>
      </div>

      {/* Right Side Image Section */}
      <div className="md:w-1/2 relative mt-8 md:mt-0 flex justify-center">
        {/* Notes Image */}
        <div className="relative w-72 h-72 md:w-64 md:h-64 lg:w-64 lg:h-64">
          <img
            src="/Notes.png"
            alt="Notes"
            className="w-full h-full object-contain drop-shadow-lg"
          />

          {/* Free Badge */}
          <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            FREE
          </span>

          {/* Floating Icons */}
          <div className="absolute -top-4 -left-8 bg-white p-2 rounded-full shadow-md">
            <FaCalculator className="w-6 h-6 text-gray-800" />
          </div>
          <div className="absolute bottom-10 -left-16 bg-white p-2 rounded-full shadow-md">
            <FaEdit className="w-6 h-6 text-gray-800" />
          </div>
          <div className="absolute top-10 -right-16 bg-white p-2 rounded-full shadow-md">
            <FaChartBar className="w-6 h-6 text-gray-800" />
          </div>
          <div className="absolute -bottom-4 -right-8 bg-white p-2 rounded-full shadow-md">
            <FaFlask className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesBanner;