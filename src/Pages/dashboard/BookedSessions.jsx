import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const BookedSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: bookedSessions = [], isLoading, isError, error } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading your sessions...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const handleNavigate = (id) => {
    navigate(`/dashboard/booked/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Booked Study Sessions</h2>
      {bookedSessions.length === 0 ? (
        <p className="text-center text-gray-500">You haven't booked any sessions yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookedSessions.map((session) => (
            <div key={session._id} className="border shadow-md rounded-lg p-4 bg-white">
              <img
                src={session.image}
                alt={session.title}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{session.title}</h3>
              <p><span className="font-semibold">Tutor:</span> {session.tutor}</p>
              <p><span className="font-semibold">Description:</span> {session.description?.slice(0, 80)}...</p>
              <p><span className="font-semibold">Fee:</span> ৳{session.fee}</p>
              <p><span className="font-semibold">Duration:</span> {session.duration}</p>
              <p><span className="font-semibold">Start:</span> {new Date(session.classStart).toLocaleString()}</p>
              <p><span className="font-semibold">End:</span> {new Date(session.classEnd).toLocaleString()}</p>
              <button
                onClick={() => handleNavigate(session._id)}
                className="inline-block mt-3 text-sm font-medium text-green-600 hover:underline"
              >
                View Details & Review →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSessions;
