import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const StudyMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Get booked sessions
  const { data: bookedSessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user?.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  // Get materials for selected session
  const { data: materials = [], isLoading: materialsLoading } = useQuery({
    queryKey: ['materials', selectedSessionId],
    queryFn: async () => {
      if (!selectedSessionId) return [];
      const res = await axiosSecure.get(`/materials?sessionId=${selectedSessionId}`);
      return res.data || [];
    },
    enabled: !!selectedSessionId,
  });

  const handleSessionClick = (sessionId) => setSelectedSessionId(sessionId);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-100">
      <h2 className="text-3xl font-bold mb-6 text-base-content">My Booked Sessions</h2>

      {sessionsLoading ? (
        <p className="text-base-content">Loading booked sessions...</p>
      ) : bookedSessions.length === 0 ? (
        <p className="text-base-content">No booked sessions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bookedSessions.map((session) => (
            <div
              key={session._id}
              onClick={() => handleSessionClick(session.sessionId || session._id)}
              className={`cursor-pointer card bg-base-100 shadow-md p-4 hover:shadow-lg transition-shadow ${
                selectedSessionId === (session.sessionId || session._id)
                  ? 'border-4 border-primary'
                  : 'border border-base-content/20'
              }`}
            >
              <h3 className="text-xl font-semibold text-base-content">{session.title}</h3>
              <p className="text-sm text-base-content/70">{session.description?.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      {selectedSessionId && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-base-content">Study Materials</h3>
          {materialsLoading ? (
            <p className="text-base-content">Loading materials...</p>
          ) : materials.length === 0 ? (
            <p className="text-base-content">No materials found for this session.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div key={material._id} className="border border-base-content/20 rounded-lg p-4 shadow bg-base-100">
                  <img
                    src={material.imageUrl || 'https://via.placeholder.com/400x200?text=Material+Image'}
                    alt={material.title || 'Study material'}
                    className="w-full h-48 object-cover mb-4 rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=Material+Image';
                    }}
                  />
                  <div className="flex justify-between items-center mb-2">
                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                      aria-label={`Open Google Drive link for ${material.title || 'study material'}`}
                    >
                      Open Google Drive Link
                    </a>
                    <a
                      href={material.imageUrl}
                      download
                      className="btn btn-sm bg-base-200 text-primary border-primary border-2 hover:bg-primary hover:text-primary-content rounded-lg px-3 py-1"
                      title="Download Image"
                      aria-label={`Download image for ${material.title || 'study material'}`}
                    >
                      Download
                    </a>
                  </div>
                  {material.title && <p className="font-medium text-base-content">{material.title}</p>}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudyMaterials;