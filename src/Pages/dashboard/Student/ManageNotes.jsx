import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch notes of the logged-in user
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
      Swal.fire('Error', 'Failed to fetch notes', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this note!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/notes/${id}`);
          Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
          fetchNotes();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete note', 'error');
        }
      }
    });
  };

  const startEdit = (note) => {
    setEditNoteId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  };

  const cancelEdit = () => {
    setEditNoteId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !editDescription.trim()) {
      Swal.fire('Error', 'Please fill out all fields', 'error');
      return;
    }

    try {
      await axiosSecure.put(`/notes/${editNoteId}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });

      Swal.fire('Success', 'Note updated successfully!', 'success');
      cancelEdit();
      fetchNotes();
    } catch (error) {
      console.error('Failed to update note', error);
      Swal.fire('Error', 'Failed to update note', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Manage Your Notes</h2>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map(note => (
          <div key={note._id} className="mb-4 border border-gray-300 rounded p-4">
            {editNoteId === note._id ? (
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <textarea
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <div className="flex space-x-2">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="mb-2 whitespace-pre-wrap">{note.description}</p>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(note)}
                    className="btn btn-outline btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ManageNotes;
