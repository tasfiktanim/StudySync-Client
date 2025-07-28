import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router';
import PaymentForm from '../dashboard/Payment/PaymentForm';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const SessionDetails = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['sessionDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="p-6 text-center">Loading session details...</div>;

  if (error || !session) {
    toast.error('Failed to load session');
    return <div className="p-6 text-center text-red-500">Failed to load session details.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Session Details */}
      <div className="md:col-span-2 space-y-4">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">{session.title}</h2>
            <p className="mt-2">{session.description}</p>
            <p><strong>Tutor:</strong> {session.tutor}</p>
            <p><strong>Duration:</strong> {session.duration}</p>
            <p><strong>Status:</strong> {session.status}</p>
          </div>
        </div>
      </div>

      {/* Right: Payment / Enroll Section */}
      <div className="card bg-white border border-gray-200 shadow-md p-6 rounded-xl">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            ৳<span className="text-green-600">{session.fee}</span>
          </h3>
          <span className="text-sm bg-red-500 text-white px-2 py-1 rounded mt-2 inline-block">
            Enroll now and start learning!
          </span>
        </div>

        <button
          className="btn btn-success w-full mb-4"
          onClick={() => setShowPaymentForm(true)}
        >
          Book Now
        </button>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>📚 Total Enrolled: <span className="font-semibold">{session.enrolled || 'N/A'}</span></li>
          <li>⏱️ Duration: <span className="font-semibold">{session.duration}</span></li>
          <li>🎓 Tutor: <span className="font-semibold">{session.tutor}</span></li>
          <li>♾️ Lifetime Access</li>
          <li>💬 Facebook Support Group</li>
        </ul>

        {/* Stripe Payment Form */}
        {showPaymentForm && (
          <div id="payment" className="mt-6">
            <Elements stripe={stripePromise}>
              <PaymentForm sessionId={session._id} />
            </Elements>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="md:col-span-3 mt-12">
        <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>

        <div className="space-y-4">
          {/* Review 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">by Alina Rahman</span>
            </div>
            <p className="text-gray-800">This session was extremely helpful. The tutor explained everything clearly.</p>
          </div>

          {/* Review 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <FaStar className="text-yellow-400 opacity-30" />
              <span className="ml-2 text-sm text-gray-600">by Zihan Karim</span>
            </div>
            <p className="text-gray-800">Good content, but I wish there were more examples. Overall, a solid session.</p>
          </div>

          {/* Review 3 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(3)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {[...Array(2)].map((_, i) => (
                <FaStar key={i + 3} className="text-yellow-400 opacity-30" />
              ))}
              <span className="ml-2 text-sm text-gray-600">by Tamim Hossain</span>
            </div>
            <p className="text-gray-800">Decent session. Could be better paced. Tutor was responsive though!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
