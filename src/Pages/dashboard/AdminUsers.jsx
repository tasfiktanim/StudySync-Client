import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ROLES = ["user", "Admin", "Instructor", "Student"];

const AdminUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminUsers", searchText, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users?search=${searchText}&page=${page}&limit=${LIMIT}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!searchText || page > 0,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // Role update mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/admin/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      toast.success("User role updated successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update user role");
    },
  });

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchText(searchTerm.trim());
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        User Management
      </h2>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Search
        </button>
      </form>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center font-medium">Failed to load users</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">No users found.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md bg-white">
            <table className="table w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-base">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Created At</th>
                  <th className="py-4 px-6">Current Role</th>
                  <th className="py-4 px-6">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6">{(page - 1) * LIMIT + idx + 1}</td>
                    <td className="py-4 px-6">{user.name || "-"}</td>
                    <td className="py-4 px-6 break-words max-w-[200px]">{user.email}</td>
                    <td className="py-4 px-6">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="badge bg-primary text-white px-3 py-1 rounded-full">
                        {user.role || "User"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        className="select select-bordered w-full max-w-xs rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                        value={user.role || "User"}
                        onChange={(e) =>
                          updateRoleMutation.mutate({
                            id: user._id,
                            role: e.target.value,
                          })
                        }
                        disabled={updateRoleMutation.isLoading}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {users.map((user, idx) => (
              <div key={user._id} className="card bg-white shadow-md rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">#{(page - 1) * LIMIT + idx + 1}</span>
                    <span className="badge bg-primary text-white px-3 py-1 rounded-full">
                      {user.role || "User"}
                    </span>
                  </div>
                  <p><strong className="text-gray-700">Name:</strong> {user.name || "-"}</p>
                  <p className="break-words"><strong className="text-gray-700">Email:</strong> {user.email}</p>
                  <p>
                    <strong className="text-gray-700">Created At:</strong>{" "}
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-"}
                  </p>
                  <div className="pt-2">
                    <select
                      className="select select-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                      value={user.role || "User"}
                      onChange={(e) =>
                        updateRoleMutation.mutate({
                          id: user._id,
                          role: e.target.value,
                        })
                      }
                      disabled={updateRoleMutation.isLoading}
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            <button
              className="btn btn-sm btn-outline rounded-full hover:bg-primary hover:text-white transition"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`btn btn-sm rounded-full ${
                    pageNum === page ? "btn-primary" : "btn-outline"
                  } hover:bg-primary hover:text-white transition`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="btn btn-sm btn-outline rounded-full hover:bg-primary hover:text-white transition"
              onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;