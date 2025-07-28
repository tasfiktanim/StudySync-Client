import React, { useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUserRole from '../../Hooks/useUserRole';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyCreatedSessions = () => {
  const [editSession, setEditSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [approvalType, setApprovalType] = useState('free');
  const [fee, setFee] = useState(0);
  const [page, setPage] = useState(1);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const limit = 6;

  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Updated getSessionStatus with registrationEnd check:
  const getSessionStatus = (session) => {
    if (!session.startDate || !session.endDate) {
      return session.status || 'pending';
    }

    const now = new Date();
    const startDate = new Date(session.startDate);
    const endDate = new Date(session.endDate);
    const registrationEnd = session.registrationEnd ? new Date(session.registrationEnd) : null;

    if (session.status === 'rejected') return 'rejected';
    if (session.status === 'pending') return 'pending';
    if (now < startDate) return 'upcoming';

    if (now >= startDate && now <= endDate) {
      if (registrationEnd && now >= registrationEnd) {
        return 'closed'; // registration time over during ongoing session period
      }
      return 'ongoing';
    }

    if (now > endDate) return 'closed';

    return 'pending'; // fallback
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const { data: sessionData = {}, isLoading } = useQuery({
    queryKey: ['mySessions', user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions?email=${user?.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const sessions = sessionData?.data || [];
  const pagination = sessionData?.pagination || {};

  // Filter sessions based on role:
  // - User sees only approved sessions
  // - Admin and Instructor see all
  const filteredSessions = sessions.filter(session => {
    if (role?.toLowerCase() === 'user') {
      return getSessionStatus(session) === 'approved';
    }
    return true;
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, fee }) => {
      return await axiosSecure.patch(`/sessions/${id}`, { 
        status: 'approved', 
        fee,
        approvedAt: new Date().toISOString() 
      });
    },
    onSuccess: () => {
      toast.success('Session approved successfully');
      queryClient.invalidateQueries(['mySessions', user?.email, page]);
      document.getElementById('approve_modal').close();
    },
    onError: (error) => {
      toast.error('Failed to approve session');
      console.error('Approval error:', error);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, rejectionReason, feedback }) => {
      return await axiosSecure.patch(`/sessions/${id}`, {
        status: 'rejected',
        rejectionReason,
        feedback,
        rejectedAt: new Date().toISOString()
      });
    },
    onSuccess: () => {
      toast.success('Session rejected successfully');
      queryClient.invalidateQueries(['mySessions', user?.email, page]);
      closeRejectModal();
    },
    onError: (error) => {
      toast.error('Failed to reject session');
      console.error('Rejection error:', error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/sessions/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The session has been deleted.',
        confirmButtonColor: '#3085d6'
      });
      queryClient.invalidateQueries(['mySessions', user?.email, page]);
    },
    onError: (error) => {
      toast.error('Failed to delete session');
      console.error('Deletion error:', error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      return await axiosSecure.patch(`/sessions/${id}`, updatedData);
    },
    onSuccess: () => {
      toast.success('Session updated successfully');
      queryClient.invalidateQueries(['mySessions', user?.email, page]);
      document.getElementById('update_modal').close();
    },
    onError: (error) => {
      toast.error('Failed to update session');
      console.error('Update error:', error);
    }
  });

  const handleApprove = () => {
    if (!selectedSession) return;
    const parsedFee = approvalType === 'free' ? 0 : Number(fee);
    if (approvalType === 'paid' && (isNaN(parsedFee) || parsedFee <= 0)) {
      toast.error("Please enter a valid fee amount.");
      return;
    }
    approveMutation.mutate({ id: selectedSession._id, fee: parsedFee });
  };

  const openRejectModal = (session) => {
    setSelectedSession(session);
    setRejectionReason('');
    setFeedback('');
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setSelectedSession(null);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      toast.error("Rejection reason is required.");
      return;
    }
    rejectMutation.mutate({
      id: selectedSession._id,
      rejectionReason,
      feedback
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleBookNow = (id) => {
    navigate(`/bookedSession/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'ongoing':
        return 'text-green-600';
      case 'rejected':
      case 'closed':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      case 'upcoming':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Created Sessions</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No sessions found</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const status = getSessionStatus(session);
              const statusColor = getStatusColor(status);

              return (
                <div key={session._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                  <figure>
                    <img
                      src={session.image || '/default-session.jpg'}
                      alt={session.title}
                      className="h-48 w-full object-cover"
                      onError={(e) => { e.target.src = '/default-session.jpg'; }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{session.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{session.description}</p>
                    <div className="space-y-1 mt-2">
                      <p><strong>Tutor:</strong> {session.tutor || 'Not specified'}</p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={`capitalize font-semibold ${statusColor}`}>
                          {status}
                        </span>
                      </p>
                      <p><strong>Duration:</strong> {session.duration || 'Not specified'}</p>
                      <p><strong>Fee:</strong> ${session.fee || 0}</p>
                      {session.startDate && session.endDate && (
                        <p>
                          <strong>Dates:</strong>{' '}
                          {new Date(session.startDate).toLocaleDateString()} -{' '}
                          {new Date(session.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Show rejection reason and feedback only to Admin and Instructor */}
                    {status === 'rejected' && (role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'instructor') && (
                      <div className="bg-red-50 p-3 rounded mt-2 space-y-1">
                        <p className="text-sm">
                          <strong>Rejection Reason:</strong> {session.rejectionReason || 'Not provided'}
                        </p>
                        {session.feedback && (
                          <p className="text-sm">
                            <strong>Feedback:</strong> {session.feedback}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="card-actions justify-end mt-4">
                      {role?.toLowerCase() === 'admin' && status === 'pending' && (
                        <div className="flex gap-2 w-full">
                          <button
                            onClick={() => {
                              setSelectedSession(session);
                              setApprovalType(session.fee === 0 ? 'free' : 'paid');
                              setFee(session.fee);
                              document.getElementById('approve_modal').showModal();
                            }}
                            className="btn btn-sm btn-success flex-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(session)}
                            className="btn btn-sm btn-warning flex-1"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {role?.toLowerCase() === 'admin' && status !== 'pending' && status !== 'rejected' && (
                        <div className="flex gap-2 w-full">
                          <button
                            className="btn btn-sm btn-info flex-1"
                            onClick={() => {
                              setEditSession(session);
                              document.getElementById('update_modal').showModal();
                            }}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(session._id)}
                            className="btn btn-sm btn-error flex-1"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {/* View Details button for everyone */}
                      <button
                        className="btn btn-sm btn-primary w-full mt-2"
                        onClick={() => handleBookNow(session._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`btn btn-sm ${page === pageNum ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="btn btn-sm"
                onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
                disabled={page === pagination.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Approve Modal */}
      <dialog id="approve_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Approve Session</h3>
          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <span className="label-text">Free Session</span>
              <input
                type="radio"
                name="payment"
                className="radio checked:bg-blue-500"
                checked={approvalType === 'free'}
                onChange={() => {
                  setApprovalType('free');
                  setFee(0);
                }}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Paid Session</span>
              <input
                type="radio"
                name="payment"
                className="radio checked:bg-blue-500"
                checked={approvalType === 'paid'}
                onChange={() => setApprovalType('paid')}
              />
            </label>
          </div>

          {approvalType === 'paid' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Session Fee</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
                <input
                  type="number"
                  placeholder="Enter fee amount"
                  className="input input-bordered w-full pl-8"
                  value={fee}
                  min="0"
                  step="0.01"
                  onChange={(e) => setFee(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          <div className="modal-action">
            <button
              className="btn mr-2"
              onClick={() => document.getElementById('approve_modal').close()}
              disabled={approveMutation.isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleApprove}
              className="btn btn-success"
              disabled={approveMutation.isLoading}
            >
              {approveMutation.isLoading ? 'Approving...' : 'Confirm Approval'}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Reject Modal */}
      <dialog open={rejectModalOpen} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Reject Session</h3>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Reason for Rejection (required)</span>
            </label>
            <textarea
              rows={3}
              className="textarea textarea-bordered w-full"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please specify the reason for rejecting this session"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Feedback for Creator (optional)</span>
            </label>
            <textarea
              rows={3}
              className="textarea textarea-bordered w-full"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback to help improve the session"
            />
          </div>
          <div className="modal-action">
            <button
              onClick={closeRejectModal}
              className="btn btn-outline mr-2"
              disabled={rejectMutation.isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleRejectConfirm}
              className="btn btn-warning"
              disabled={rejectMutation.isLoading || !rejectionReason.trim()}
            >
              {rejectMutation.isLoading ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </dialog>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Session</h3>
          {editSession && (
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Session Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editSession.title}
                  onChange={(e) =>
                    setEditSession({ ...editSession, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editSession.duration}
                  onChange={(e) =>
                    setEditSession({ ...editSession, duration: e.target.value })
                  }
                  placeholder="e.g., 2 hours"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Session Fee ($)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={editSession.fee}
                  min="0"
                  step="0.01"
                  onChange={(e) =>
                    setEditSession({ ...editSession, fee: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          )}

          <div className="modal-action">
            <button
              className="btn mr-2"
              onClick={() => document.getElementById('update_modal').close()}
              disabled={updateMutation.isLoading}
            >
              Cancel
            </button>
            <button
              onClick={() =>
                updateMutation.mutate({
                  id: editSession._id,
                  updatedData: {
                    title: editSession.title,
                    duration: editSession.duration,
                    fee: editSession.fee,
                  }
                })
              }
              className="btn btn-success"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyCreatedSessions;
