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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Create New Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* All input fields (same as before) */}
        {/* Title */}
        <div>
          <label>Session Title</label>
          <input {...register('title', { required: true })} className="input input-bordered w-full" />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Tutor Name */}
        <div>
          <label>Tutor Name</label>
          <input {...register('tutor', { required: true })} className="input input-bordered w-full" />
          {errors.tutor && <p className="text-red-500">Tutor name is required</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full" />
          {errors.description && <p className="text-red-500">Description is required</p>}
        </div>

        {/* Registration Start & End */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Registration Start</label>
            <input type="date" {...register('registrationStart', { required: true })} className="input input-bordered w-full" />
            {errors.registrationStart && <p className="text-red-500">Required</p>}
          </div>
          <div>
            <label>Registration End</label>
            <input type="date" {...register('registrationEnd', { required: true })} className="input input-bordered w-full" />
            {errors.registrationEnd && <p className="text-red-500">Required</p>}
          </div>
        </div>

        {/* Class Start & End */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Class Start</label>
            <input type="datetime-local" {...register('classStart', { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label>Class End</label>
            <input type="datetime-local" {...register('classEnd', { required: true })} className="input input-bordered w-full" />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label>Session Duration</label>
          <input {...register('duration', { required: true })} className="input input-bordered w-full" placeholder="e.g. 2h 30m" />
        </div>

        {/* Fee */}
        <div>
          <label>Fee (0 = Free)</label>
          <input type="number" step="0.01" {...register('fee', { required: true, min: 0 })} className="input input-bordered w-full" />
        </div>

        {/* Image */}
        <div>
          <label>Image URL</label>
          <input {...register('image', { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select {...register('status')} className="select select-bordered w-full">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4 w-full">Create Session</button>
      </form>
    </div>
  );
};

export default SessionForm;
