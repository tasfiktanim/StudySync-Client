import React from 'react';

const CourseSection = () => {
  const locations = ['New York', 'London', 'Toronto', 'Sydney', 'Dubai'];

  const courses = [
    {
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGVkdWNhdGlvbmFsJTIwY291cnNlJTIwcG9zdGVyfGVufDB8fDB8fHwy',
      title: 'Spoken English Junior',
      subtitle: 'For students of Grade 4–10',
    },
    {
      image: 'https://images.unsplash.com/photo-1676747484510-755c231ae83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVkdWNhdGlvbmFsJTIwY291cnNlJTIwcG9zdGVyfGVufDB8fDB8fHwy',
      title: 'IELTS Programme',
      subtitle: '5,000+ practical materials included',
    },
    {
      image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGVkdWNhdGlvbmFsJTIwY291cnNlJTIwcG9zdGVyfGVufDB8fDB8fHwy',
      title: 'After SSC English Course',
      subtitle: 'Complete English course: Grammar, Speaking, Writing',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#4B0D1A] via-[#6E1423] to-[#A62639] rounded-2xl p-8 text-white mt-16">
      <h2 className="text-center text-xl font-semibold mb-6">
        We have successfully taught English to over 500,000 students online — now we’re offline too!
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {locations.map((place, idx) => (
          <div
            key={idx}
            className="bg-white/10 bg-opacity-10 px-4 py-2 rounded-xl text-sm flex items-center gap-1 backdrop-blur-sm"
          >
            📍 {place}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 w-64 hover:bg-opacity-20 transition duration-200"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <p className="text-yellow-300 text-sm font-medium mb-1">Book Free Class</p>
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm text-gray-200">{course.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-green-400 font-medium">
        Book your free class &nbsp; | &nbsp; Learn more →
      </div>
    </div>
  );
};

export default CourseSection;
