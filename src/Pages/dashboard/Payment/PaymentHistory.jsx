import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const formatDate = (date) => {
  try {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()) ? parsed.toLocaleString() : 'Invalid Date';
  } catch {
    return 'Invalid Date';
  }
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ['paymentsid', user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentsid?email=${user.email}`);
      return res.data;
    },
  });

  console.log(payments);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 max-w-full mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">💳 Payment History</h2>

      <div className="overflow-x-auto">
        {/* Table for md+ screens */}
        <table className="hidden md:table table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">Session ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">Transaction</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p, index) => (
                <tr key={p.transactionId} className="hover:bg-gray-50 border border-gray-200">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 max-w-[150px] truncate text-sm" title={p.sessionId}>
                    {p.sessionId?.slice(-6)}...
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold text-sm">
                    ৳{p.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-xs text-gray-600 break-all">
                    {p.transactionId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {formatDate(p.paid_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 border border-gray-300 text-sm">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Card layout for mobile screens */}
        <div className="md:hidden space-y-4">
          {payments.length > 0 ? (
            payments.map((p, index) => (
              <div key={p.transactionId} className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">Payment #{index + 1}</span>
                  <span className="text-green-600 font-semibold text-sm">৳{p.amount}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Session ID:</span>{' '}
                    <span title={p.sessionId}>{p.sessionId?.slice(-6)}...</span>
                  </p>
                  <p>
                    <span className="font-medium">Transaction:</span>{' '}
                    <span className="font-mono text-xs break-all">{p.transactionId}</span>
                  </p>
                  <p>
                    <span className="font-medium">Paid At:</span> {formatDate(p.paid_at)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No payment history found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
