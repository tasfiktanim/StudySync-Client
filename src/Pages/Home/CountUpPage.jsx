import React from 'react';
import { useLocation } from 'react-router';
import CountUp from 'react-countup';
import { FaChartLine, FaCheckCircle, FaSmile } from 'react-icons/fa';

const CountUpPage = () => {
  const location = useLocation();

  const stats = [
    {
      number: 95,
      suffix: '%',
      label: 'Success Rate',
      secondaryLabel: 'Project Delivery',
      icon: <FaChartLine className="text-4xl text-green-400 mb-2 mx-auto" />,
    },
    {
      number: 1200,
      suffix: '+',
      label: 'Projects Completed',
      secondaryLabel: 'Across Industries',
      icon: <FaCheckCircle className="text-4xl text-blue-400 mb-2 mx-auto" />,
    },
    {
      number: 85,
      suffix: '%',
      label: 'Client Satisfaction',
      secondaryLabel: 'Positive Feedback',
      icon: <FaSmile className="text-4xl text-yellow-400 mb-2 mx-auto" />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center p-10 sm:p-20">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Our Achievements
        </h1>
        <p className="text-base sm:text-xl text-gray-300 text-center mb-8">
          Admission Success of StudySphere in the 2022–24 Academic Year. Your success is our inspiration.
        </p>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 md:grid-rows-1">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white/10 text-white shadow-xl p-4 sm:p-6 text-center rounded-xl ${index === 2 ? 'col-span-2 md:col-span-1' : ''
                }`}
            >
              <div>
                {stat.icon}
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 sm:mb-2 break-words">
                  <span className="block">
                    <CountUp
                      end={stat.number}
                      suffix={stat.suffix}
                      duration={2.5}
                      separator=","
                    />
                  </span>
                </h2>
                <p className="text-base sm:text-lg font-semibold">{stat.label}</p>
                <p className="text-sm sm:text-md text-gray-200">{stat.secondaryLabel}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CountUpPage;
