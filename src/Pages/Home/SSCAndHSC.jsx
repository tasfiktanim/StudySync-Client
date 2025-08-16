import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const SSCAndHSC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 animate-pulse">
          SSC & HSC
        </h2>
        <h3 className="text-2xl text-gray-700 mb-8">Know More</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-red-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">HSC 27 ONLINE BATCH</h2>
              <p>Finance + Accounting</p>
              <Link
                to="/dashboard/my-created-sessions"
                className="link link-hover text-white mt-2 flex items-center gap-2"
              >
                Know More <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-red-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">HSC 27 ONLINE BATCH</h2>
              <p>Geography + Economics</p>
              <Link
                to="/dashboard/my-created-sessions"
                className="link link-hover text-white mt-2 flex items-center gap-2"
              >
                Know More <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-red-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">HSC 27 ONLINE BATCH</h2>
              <p>Physics + Chemistry + Math + Biology</p>
              <Link
                to="/dashboard/my-created-sessions"
                className="link link-hover text-white mt-2 flex items-center gap-2"
              >
                Know More <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-red-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">HSC 27 ONLINE BATCH</h2>
              <p>Bangla + English + ICT</p>
              <Link
                to="/dashboard/my-created-sessions"
                className="link link-hover text-white mt-2 flex items-center gap-2"
              >
                Know More <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSCAndHSC;
