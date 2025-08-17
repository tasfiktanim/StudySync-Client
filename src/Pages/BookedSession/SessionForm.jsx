import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const SessionForm = () => {
  const [sessions, setSessions] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load user sessions
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get('/sessions')
        .then((res) => {
          setSessions(res.data.data);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          toast.error('Failed to load sessions');
        });
    }
  }, [user?.email, axiosSecure]);

  const onSubmit = async (data) => {
    const imageRegex = /^https?:\/\/.*\.(jpg|jpeg|png|webp|svg|gif|bmp)(\?.*)?$/i;
    if (!imageRegex.test(data.image)) {
      toast.error('Invalid image URL');
      return;
    }
    const sessionData = {
      ...data,
    };
    try {
      const res = await axiosSecure.post('/sessions', sessionData);
      if (res.data.insertedId) {
        toast.success('Session created!');
        reset();
        const updated = await axiosSecure.get('/sessions');
        setSessions(updated.data.data);
      } else {
        toast.error('Failed to create session');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-base-content">Create New Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-base-content font-medium mb-1">Session Title</label>
          <input
            {...register('title', { required: true })}
            className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="Enter session title"
          />
          {errors.title && <p className="text-error mt-1">Title is required</p>}
        </div>
        {/* Tutor Name */}
        <div>
          <label className="block text-base-content font-medium mb-1">Tutor Name</label>
          <input
            {...register('tutor', { required: true })}
            className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="Enter tutor name"
          />
          {errors.tutor && <p className="text-error mt-1">Tutor name is required</p>}
        </div>
        {/* Description */}
        <div>
          <label className="block text-base-content font-medium mb-1">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="Enter session description"
          />
          {errors.description && <p className="text-error mt-1">Description is required</p>}
        </div>
        {/* Registration Start & End */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-base-content font-medium mb-1">Registration Start</label>
            <input
              type="date"
              {...register('registrationStart', { required: true })}
              className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            />
            {errors.registrationStart && <p className="text-error mt-1">Required</p>}
          </div>
          <div>
            <label className="block text-base-content font-medium mb-1">Registration End</label>
            <input
              type="date"
              {...register('registrationEnd', { required: true })}
              className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            />
            {errors.registrationEnd && <p className="text-error mt-1">Required</p>}
          </div>
        </div>
        {/* Class Start & End */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-base-content font-medium mb-1">Class Start</label>
            <input
              type="datetime-local"
              {...register('classStart', { required: true })}
              className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            />
            {errors.classStart && <p className="text-error mt-1">Required</p>}
          </div>
          <div>
            <label className="block text-base-content font-medium mb-1">Class End</label>
            <input
              type="datetime-local"
              {...register('classEnd', { required: true })}
              className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            />
            {errors.classEnd && <p className="text-error mt-1">Required</p>}
          </div>
        </div>
        {/* Duration */}
        <div>
          <label className="block text-base-content font-medium mb-1">Session Duration</label>
          <input
            {...register('duration', { required: true })}
            className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="e.g. 2h 30m"
          />
          {errors.duration && <p className="text-error mt-1">Duration is required</p>}
        </div>
        {/* Fee */}
        <div>
          <label className="block text-base-content font-medium mb-1">Fee (0 = Free)</label>
          <input
            type="number"
            step="0.01"
            {...register('fee', { required: true, min: 0 })}
            className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="Enter fee"
          />
          {errors.fee && <p className="text-error mt-1">Fee is required and must be non-negative</p>}
        </div>
        {/* Image */}
        <div>
          <label className="block text-base-content font-medium mb-1">Image URL</label>
          <input
            {...register('image', { required: true })}
            className="input w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-error mt-1">Image URL is required</p>}
        </div>
        {/* Status */}
        <div>
          <label className="block text-base-content font-medium mb-1">Status</label>
          <select
            {...register('status')}
            className="select w-full bg-base-200 text-base-content border-2 border-base-content/20 focus:border-primary focus:outline-none rounded-lg transition-colors"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4 w-full rounded-lg">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;