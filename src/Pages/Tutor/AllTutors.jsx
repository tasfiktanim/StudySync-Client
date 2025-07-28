import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

const AllTutors = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);

  const { refetch, isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      setTutors(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleUpdateStatus = async (id, newStatus, email) => {
    const confirm = await Swal.fire({
      title: `${newStatus === "approved" ? "Approve" : "Delete"} Tutor?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    });

    if (!confirm.isConfirmed) return;

    try {
      if (newStatus === "approved") {
        const res = await axiosSecure.patch(`/tutors/${id}/status`, {
          status: "active",
          email: email,
        });

        if (res.data?.success) {
          Swal.fire("Success", "Tutor approved and role updated", "success");
          refetch();
        }
      } else if (newStatus === "cancelled") {
        const res = await axiosSecure.delete(`/tutors/${id}`);
        if (res.data.success) {
          Swal.fire("Success", "Tutor deleted successfully", "success");
          setTutors((prevTutors) => prevTutors.filter((tutor) => tutor._id !== id));
        }
      }

      setSelectedTutor(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Manage Tutors</h2>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-base">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, index) => (
              <tr key={tutor._id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{tutor.name}</td>
                <td className="py-4 px-6 break-words max-w-[200px]">{tutor.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`badge text-xs font-medium ${
                      tutor.status === "active"
                        ? "bg-green-100 text-green-800"
                        : tutor.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    } px-3 py-1 rounded-full`}
                  >
                    {tutor.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setSelectedTutor(tutor)}
                      className="btn btn-xs btn-outline btn-info hover:bg-blue-600 hover:text-white transition"
                      aria-label="View tutor details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(tutor._id, "approved", tutor.email)}
                      className="btn btn-xs btn-outline btn-success hover:bg-green-600 hover:text-white transition"
                      aria-label="Approve tutor"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(tutor._id, "cancelled")}
                      className="btn btn-xs btn-outline btn-error hover:bg-red-600 hover:text-white transition"
                      aria-label="Delete tutor"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {tutors.map((tutor, index) => (
          <div key={tutor._id} className="card bg-white shadow-md rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">#{index + 1}</span>
                <span
                  className={`badge text-xs font-medium ${
                    tutor.status === "active"
                      ? "bg-green-100 text-green-800"
                      : tutor.status === "inactive"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  } px-3 py-1 rounded-full`}
                >
                  {tutor.status}
                </span>
              </div>
              <p><strong>Name:</strong> {tutor.name}</p>
              <p className="break-words"><strong>Email:</strong> {tutor.email}</p>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={() => setSelectedTutor(tutor)}
                  className="btn btn-xs btn-outline btn-info hover:bg-blue-600 hover:text-white transition"
                  aria-label="View tutor details"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleUpdateStatus(tutor._id, "approved", tutor.email)}
                  className="btn btn-xs btn-outline btn-success hover:bg-green-600 hover:text-white transition"
                  aria-label="Approve tutor"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleUpdateStatus(tutor._id, "cancelled")}
                  className="btn btn-xs btn-outline btn-error hover:bg-red-600 hover:text-white transition"
                  aria-label="Delete tutor"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Modal for tutor details */}
      {selectedTutor && (
        <dialog id="tutorDetailsModal" className="modal modal-open">
          <div className="modal-box w-full max-w-md sm:max-w-lg p-6 bg-white rounded-lg shadow-xl">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-center text-gray-800">Tutor Details</h3>
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src={selectedTutor.photo}
                alt="Tutor"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-primary"
              />
              <div className="text-sm sm:text-base space-y-3 text-left w-full">
                <p><strong className="text-gray-700">Name:</strong> {selectedTutor.name}</p>
                <p><strong className="text-gray-700">Email:</strong> {selectedTutor.email}</p>
                <p><strong className="text-gray-700">Education:</strong> {selectedTutor.education}</p>
                <p><strong className="text-gray-700">Expertise:</strong> {selectedTutor.expertise}</p>
                <p><strong className="text-gray-700">Experience:</strong> {selectedTutor.experience} years</p>
                <p><strong className="text-gray-700">Availability:</strong> {selectedTutor.availability}</p>
                <p><strong className="text-gray-700">Bio:</strong> {selectedTutor.bio}</p>
              </div>
            </div>
            <div className="modal-action mt-6">
              <button
                className="btn btn-neutral btn-sm sm:btn-md w-full sm:w-auto rounded-full"
                onClick={() => setSelectedTutor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllTutors;