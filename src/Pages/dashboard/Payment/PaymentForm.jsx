import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id: sessionId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    // Fetch session info
    const { isPending, data: sessionInfo = {} } = useQuery({
        queryKey: ['sessions', sessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${sessionId}`);
            return res.data;
        },
    });

    // Check if user already paid for this session
    const {
        data: hasPaid = false,
        isLoading: isPaymentLoading,
    } = useQuery({
        queryKey: ['hasPaid', user?.email, sessionId],
        enabled: !!user?.email && !!sessionId,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/check?email=${user.email}&sessionId=${sessionId}`
            );
            return res.data.hasPaid;
        },
    });


    // Redirect if already paid
    useEffect(() => {
        if (hasPaid && !isPaymentLoading) {
            Swal.fire({
                icon: 'info',
                title: 'Already Paid',
                text: 'You have already completed payment for this session.',
                confirmButtonText: 'Go to My Sessions',
            }).then(() => navigate('/dashboard/my-created-sessions'));
        }
    }, [hasPaid, isPaymentLoading, navigate]);

    if (isPending || isPaymentLoading) {
        return <p className="text-center">Loading payment form...</p>;
    }

    const amount = sessionInfo.fee;
    const amountInCents = Math.round(parseFloat(amount) * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: cardError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (cardError) {
            setError(cardError.message);
            setProcessing(false);
            return;
        }

        try {
            // Create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
            });
            const clientSecret = res.data.clientSecret;

            // Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName || 'Unknown',
                        email: user?.email || 'no-email@example.com',
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;
                const now = new Date();

                const paymentData = {
                    sessionId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    sessionTitle: sessionInfo?.title,
                    paid_at: now.toISOString(),
                    paid_at_string: now.toLocaleString(),
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Sessions',
                    });

                    navigate('/dashboard/my-created-sessions');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="bg-base-100 shadow-lg p-6 rounded-xl border border-gray-200 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Complete Your Payment</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                    className={`p-3 border border-gray-300 rounded-lg ${hasPaid ? 'opacity-50' : ''}`}
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#fa755a',
                            },
                        },
                    }}
                    disabled={hasPaid}
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={!stripe || processing || hasPaid || isPaymentLoading}
                >
                    {isPaymentLoading
                        ? 'Checking Payment...'
                        : hasPaid
                            ? 'Already Paid'
                            : processing
                                ? 'Processing...'
                                : `Pay ৳${amount}`}
                </button>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
