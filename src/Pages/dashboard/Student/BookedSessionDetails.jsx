import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookedSessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) return <div className="text-center py-10">Loading session...</div>;

  if (error) {
    toast.error(error.message);
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  if (!session || !session.sessionDetails) {
    return <div className="text-center text-red-500">Session details not available.</div>;
  }

  const details = session.sessionDetails;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card shadow-lg bg-white rounded-lg overflow-hidden">
        <img 
          src={details.image} 
          alt={details.title} 
          className="w-full h-64 object-cover" 
        />
        <div className="p-6 space-y-3">
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
        <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
        <p className="text-gray-500 italic">Review functionality coming soon...</p>
      </div>
    </div>
  );
};

export default BookedSessionDetails;
