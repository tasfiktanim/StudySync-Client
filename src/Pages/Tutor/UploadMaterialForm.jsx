import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const UploadMaterialForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    const materialData = {
      title: data.title,
      tutorEmail: user.email,
      image: data.image,
      link: data.link,
    };

    try {
      await axiosSecure.post('/materials', materialData);
      toast.success('Material uploaded successfully');
      reset();
      navigate('/dashboard/view-materials');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Material</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Material Title</span>
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter material title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input 
            value={user?.email} 
            readOnly 
            className="input input-bordered w-full bg-gray-100" 
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL (from ImgBB)</span>
          </label>
          <input
            {...register("image", { required: true })}
            placeholder="Paste ImgBB image URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Google Drive Link</span>
          </label>
          <input
            {...register("link", { required: true })}
            placeholder="Paste Google Drive shareable link"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/view-materials')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Uploading...
              </>
            ) : 'Upload Material'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMaterialForm;