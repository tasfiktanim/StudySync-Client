import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewMaterials = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: "", image: "", link: "" });

  const {
    data: materials = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["materialsid", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materialsid?tutorEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/materials/${id}`);
      toast.success("Material deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete material");
    }
  };

  const handleEditClick = (material) => {
    setEditId(material._id);
    setFormData({
      title: material.title,
      image: material.image,
      link: material.link,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/materials/${editId}`, formData);
      toast.success("Material updated successfully");
      setEditId(null);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
            <div className="card-body space-y-4">
              <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex justify-end gap-4 mt-4">
                <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  if (isError)
    return <div className="text-center py-12">Error loading materials</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Uploaded Materials</h2>
        {!roleLoading && (role === "Instructor" || role === "Admin") && (
          <button
            onClick={() => navigate("/dashboard/upload-materials")}
            className="btn btn-primary"
          >
            Upload New Material
          </button>
        )}
      </div>

      {materials.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-lg mb-4">You haven't uploaded any materials yet</p>
          {!roleLoading && (role === "Instructor" || role === "Admin") && (
            <button
              onClick={() => navigate("/dashboard/upload-materials")}
              className="btn btn-primary"
            >
              Upload Your First Material
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <figure>
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{mat.title}</h2>
                <div className="flex items-center">
                  <a
                    href={mat.link}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary flex items-center gap-1"
                  >
                    <FaExternalLinkAlt /> View Material
                  </a>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleEditClick(mat)}
                    className="btn btn-sm btn-warning"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mat._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Update Material</h3>
              <button
                onClick={() => setEditId(null)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Material Title"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="ImgBB Image URL"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Drive Link</span>
                </label>
                <input
                  type="text"
                  placeholder="Google Drive Link"
                  className="input input-bordered w-full"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMaterials;
