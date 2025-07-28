import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      Swal.fire('Error', 'Please fill out all fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const noteData = {
        email: user.email,
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('/notes', noteData);

      if (res.data.insertedId) {
        Swal.fire('Success', 'Note created successfully!', 'success');
        setTitle('');
        setDescription('');
      } else {
        Swal.fire('Error', 'Failed to create note', 'error');
      }
    } catch (error) {
      console.error('Create note error:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter note description"
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
