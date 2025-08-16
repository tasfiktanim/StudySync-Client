import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaUsers, FaBookOpen, FaDollarSign, FaStickyNote } from "react-icons/fa";

const Overview = () => {
  const stats = [
    { title: "Total Students", value: 245, icon: <FaUsers className="text-blue-600 text-2xl" /> },
    { title: "Study Sessions", value: 58, icon: <FaBookOpen className="text-green-600 text-2xl" /> },
    { title: "Revenue", value: "$3,450", icon: <FaDollarSign className="text-yellow-500 text-2xl" /> },
    { title: "Notes Created", value: 132, icon: <FaStickyNote className="text-purple-600 text-2xl" /> },
  ];

  const pieData = [
    { name: "Math", value: 30 },
    { name: "Science", value: 20 },
    { name: "English", value: 25 },
    { name: "History", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#a855f7"];

  const lineData = [
    { month: "Jan", bookings: 30, revenue: 1000 },
    { month: "Feb", bookings: 45, revenue: 1800 },
    { month: "Mar", bookings: 50, revenue: 2200 },
    { month: "Apr", bookings: 35, revenue: 1600 },
    { month: "May", bookings: 60, revenue: 2800 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="card bg-base-100 shadow-xl rounded-2xl">
            <div className="card-body flex-row items-center gap-4">
              {item.icon}
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h3 className="text-xl font-bold">{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">Bookings & Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">Sessions by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
