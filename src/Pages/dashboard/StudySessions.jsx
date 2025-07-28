import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const StudySessions = () => {

  const axiosSecure = useAxiosSecure();

  const now = new Date();

  const getStatus = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? 'Ongoing' : 'Closed';
  };

  // Fetch sessions created by the user
  const { data: sessions = [], isLoading, error } = useQuery({
    queryKey: ['mySessions'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions`);
      return res.data.data || [];
    },
  });

  if (isLoading) return <p>Loading sessions...</p>;
  if (error) return <p>Failed to load sessions</p>;

  // Filter approved sessions only
  const approvedSessions = sessions.filter(s => s.status === 'approved');

  return (
    <section className="bg-black py-10 px-6 text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Available Study Sessions
      </h2>

      {approvedSessions.length === 0 ? (
        <p className="text-center text-gray-400">No approved sessions available.</p>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {approvedSessions.map(session => (
            <SwiperSlide key={session._id}>
              <div className="bg-[#111827] h-[420px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
                <img
                  src={session.image}
                  alt={session.title}
                  className="h-58 w-full object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                <p className="text-sm text-gray-300 mb-2 flex-1">{session.description}</p>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${getStatus(session.registrationStart, session.registrationEnd) === 'Ongoing'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    }`}
                >
                  {getStatus(session.registrationStart, session.registrationEnd)}
                </span>
                <div className="mt-2">
                  <Link
                    to={`/bookedSession/${session._id}`} 
                    className="text-green-400 hover:underline text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="text-center mt-10">
        <NavLink to="/dashboard/my-created-sessions">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            View All Courses
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default StudySessions;
