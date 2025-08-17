import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookedSessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['bookedSessionDetails', id],
    enabled: !!id,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/booked/${id}`);
        if (!res.data) {
          throw new Error('Session not found');
        }
        return res.data;
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to fetch session');
      }
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 text-base-content">Loading session...</div>;
  }

  if (error) {
    toast.error(error.message);
    return <div className="text-center text-error">{error.message}</div>;
  }

  if (!session || !session.sessionDetails) {
    return <div className="text-center text-error">Session details not available.</div>;
  }

  const details = session.sessionDetails;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100">
      <div className="card shadow-lg bg-base-100 rounded-lg overflow-hidden">
        <img
          src={details.image || 'https://via.placeholder.com/400x200?text=Session+Image'}
          alt={details.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Session+Image';
          }}
        />
        <div className="p-6 space-y-3 text-base-content">
          <h2 className="text-3xl font-bold">{details.title}</h2>
          <p><strong>Tutor:</strong> {details.tutor}</p>
          <p><strong>Description:</strong> {details.description}</p>
          <p><strong>Fee:</strong> ৳{details.fee}</p>
          <p><strong>Duration:</strong> {details.duration}</p>
          <p><strong>Start:</strong> {new Date(details.classStart).toLocaleString()}</p>
          <p><strong>End:</strong> {new Date(details.classEnd).toLocaleString()}</p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-base-content">Leave a Review</h3>
        <p className="text-base-content/70 italic">Review functionality coming soon...</p>
      </div>
    </div>
  );
};

export default BookedSessionDetails;