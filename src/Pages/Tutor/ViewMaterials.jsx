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
      confirmButtonColor: "var(--error)",
      cancelButtonColor: "var(--primary)",
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
    document.getElementById('edit_modal')?.showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim() || !formData.link.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      await axiosSecure.patch(`/materials/${editId}`, formData);
      toast.success("Material updated successfully");
      setEditId(null);
      refetch();
      document.getElementById('edit_modal')?.close();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <div className="h-48 w-full bg-base-200 animate-pulse"></div>
            <div className="card-body space-y-4">
              <div className="h-6 bg-base-200 animate-pulse rounded"></div>
              <div className="h-4 bg-base-200 animate-pulse rounded"></div>
              <div className="flex justify-end gap-4 mt-4">
                <div className="h-10 w-20 bg-base-200 animate-pulse rounded"></div>
                <div className="h-10 w-20 bg-base-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  if (isError)
    return <div className="text-center py-12 text-base-content">Error loading materials</div>;

  return (
    <div className="p-6 bg-base-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-base-content">Your Uploaded Materials</h2>
        {!roleLoading && (role === "Instructor" || role === "Admin") && (
          <button
            onClick={() => navigate("/dashboard/upload-materials")}
            className="btn btn-primary rounded-lg px-4 py-2"
            aria-label="Upload new material"
          >
            Upload New Material
          </button>
        )}
      </div>

      {materials.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-lg text-base-content mb-4">You haven't uploaded any materials yet</p>
          {!roleLoading && (role === "Instructor" || role === "Admin") && (
            <button
              onClick={() => navigate("/dashboard/upload-materials")}
              className="btn btn-primary rounded-lg px-4 py-2"
              aria-label="Upload first material"
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
                  src={mat.image || 'https://via.placeholder.com/400x200?text=Material+Image'}
                  alt={mat.title}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Material+Image';
                  }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-base-content">{mat.title}</h2>
                <div className="flex items-center">
                  <a
                    href={mat.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
                    aria-label={`View material: ${mat.title}`}
                  >
                    <FaExternalLinkAlt /> View Material
                  </a>
                </div>
                <div className="card-actions justify-end mt-4 gap-2">
                  <button
                    onClick={() => handleEditClick(mat)}
                    className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-3 py-1 flex items-center gap-1"
                    aria-label={`Edit material: ${mat.title}`}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mat._id)}
                    className="btn btn-sm bg-error hover:bg-error-dark text-primary-content rounded-lg px-3 py-1 flex items-center gap-1 border-2 border-error/50"
                    aria-label={`Delete material: ${mat.title}`}
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
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-base-100 max-w-md">
          <h3 className="text-lg font-bold text-base-content mb-4">Update Material</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">Title</span>
              </label>
              <input
                type="text"
                placeholder="Material Title"
                className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                aria-describedby="title-error"
              />
              {!formData.title.trim() && (
                <p id="title-error" className="text-error mt-1">
                  Title is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="ImgBB Image URL"
                className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                aria-describedby="image-error"
              />
              {!formData.image.trim() && (
                <p id="image-error" className="text-error mt-1">
                  Image URL is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">Drive Link</span>
              </label>
              <input
                type="text"
                placeholder="Google Drive Link"
                className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                required
                aria-describedby="link-error"
              />
              {!formData.link.trim() && (
                <p id="link-error" className="text-error mt-1">
                  Drive link is required
                </p>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="btn bg-base-200 text-base-content hover:bg-base-content hover:text-primary-content rounded-lg px-4 py-2"
                onClick={() => document.getElementById('edit_modal')?.close()}
                aria-label="Cancel update"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-lg px-4 py-2"
                disabled={!formData.title.trim() || !formData.image.trim() || !formData.link.trim()}
                aria-label="Save material changes"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ViewMaterials;