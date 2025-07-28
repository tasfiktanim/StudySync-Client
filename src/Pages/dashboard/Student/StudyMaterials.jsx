import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const StudyMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Get booked sessions
  const { data: bookedSessions = [], isLoading: sessionsLoading,} = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Booked Sessions</h2>

      {sessionsLoading ? (
        <p>Loading booked sessions...</p>
      ) : bookedSessions.length === 0 ? (
        <p>No booked sessions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bookedSessions.map((session) => (
            <div
              key={session._id}
              onClick={() => handleSessionClick(session.sessionId || session._id)}
              className={`cursor-pointer card bg-base-100 shadow-md p-4 ${
                selectedSessionId === (session.sessionId || session._id)
                  ? 'border-4 border-blue-500'
                  : ''
              }`}
            >
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600">{session.description?.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      {selectedSessionId && (
        <>
          <h3 className="text-2xl font-semibold mb-4">Study Materials</h3>
          {materialsLoading ? (
            <p>Loading materials...</p>
          ) : materials.length === 0 ? (
            <p>No materials found for this session.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div key={material._id} className="border rounded p-4 shadow">
                  <img
                    src={material.imageUrl}
                    alt={material.title || 'Study material'}
                    className="w-full h-48 object-cover mb-4 rounded"
                    loading="lazy"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open Google Drive Link
                    </a>
                    <a
                      href={material.imageUrl}
                      download
                      className="btn btn-sm btn-outline"
                      title="Download Image"
                    >
                      Download
                    </a>
                  </div>
                  {material.title && <p className="font-medium">{material.title}</p>}
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
