import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const LIMIT = 6;

const OurTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  console.log("User role:", role); // Debug role value

  const {
    data = { total: 0, tutors: [] },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutors", searchText, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutors/active?search=${encodeURIComponent(searchText)}&page=${page}&limit=${LIMIT}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data.total / LIMIT);
  const tutors = data.tutors || [];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchTerm.trim());
    setPage(1);
  };

  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this tutor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/tutors/${id}`, { status: "cancelled" });
        Swal.fire("Deactivated!", "Tutor has been deactivated.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to deactivate tutor.", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this tutor permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/tutors/${id}`);
        Swal.fire("Deleted!", "Tutor has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete tutor.", "error");
      }
    }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Our Tutors</h2>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn ml-2">
          Search
        </button>
      </form>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(LIMIT)].map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded shadow animate-pulse bg-gray-100 h-64"
            />
          ))}
        </div>
      ) : tutors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="card shadow-md border p-4 rounded-lg bg-white"
              >
                <img
                  src={tutor.photo}
                  alt={tutor.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold">{tutor.name}</h3>
                <p className="text-gray-600">Email: {tutor.email}</p>
                <p className="text-gray-600">
                  Subject: {tutor.expertise || "N/A"}
                </p>
                <p className="text-gray-600">
                  Education: {tutor.education || "N/A"}
                </p>
                <p className="text-gray-600">
                  Experience: {tutor.experience || "N/A"} years
                </p>
                <p className="text-gray-600">
                  Availability: {tutor.availability || "N/A"}
                </p>
                <p className="text-gray-600">Bio: {tutor.bio || "N/A"}</p>
                <p className="text-gray-600 capitalize">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      tutor.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </p>

                {/* Show buttons if role is admin (case-insensitive check) */}
                {role && role.toLowerCase() === "Admin" && (
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      onClick={() => handleDeactivate(tutor._id)}
                      className="btn btn-sm btn-warning w-full"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="btn btn-sm btn-error w-full"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="join">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`join-item btn ${
                    page === idx + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No tutors found.</p>
      )}
    </div>
  );
};

export default OurTutors;
