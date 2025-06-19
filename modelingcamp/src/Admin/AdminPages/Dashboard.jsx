import React, { useState, useEffect } from "react";
import StatCard from "../StatCard";
import { Users, BookOpen, DollarSign, CalendarCheck } from "lucide-react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/consultations")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  // Count genders
  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(genderCounts);
  const dataCounts = Object.values(genderCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Models",
        data: dataCounts,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 30,
      },
    ],
  };

  return (
    <div className="p-4 space-y-6 max-w-full">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={users.length} icon={<Users />} />
        <StatCard title="Total Teachers" value="5" icon={<BookOpen />} />
        <StatCard title="Fees Collected" value="$15,000" icon={<DollarSign />} />
        <StatCard title="Today’s Attendance" value="92%" icon={<CalendarCheck />} />
      </div>

      {/* Loading or Chart */}
      <div className="max-w-full sm:max-w-md mx-auto p-4 ">
        {loading ? (
          <p className="text-center text-gray-600">Loading chart...</p>
        ) : (
          <div className="w-full" style={{ minHeight: "300px" }}>
            <Pie data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
        <h4 className="text-xl font-bold mb-4 text-center sm:text-2xl mt-[2rem]"> Gender Distribution</h4>
      </div>

      {/* Events Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 sm:text-2xl">Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-600">No active events.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-700">{event.description}</p>
                <p className="text-xs text-gray-500">Date: {event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
