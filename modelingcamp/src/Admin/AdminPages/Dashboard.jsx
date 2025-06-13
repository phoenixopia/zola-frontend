import React, { useState } from "react";
import StatCard from "../StatCard";
import { Users, BookOpen, DollarSign, CalendarCheck } from "lucide-react";

const Dashboard = () => {
  const [events, setEvents] = useState([]); // Example: empty event list

  return (
    <div className="p-4 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="350" icon={<Users />} />
        <StatCard title="Total Teachers" value="5" icon={<BookOpen />} />
        <StatCard title="Fees Collected" value="$15,000" icon={<DollarSign />} />
        <StatCard title="Today’s Attendance" value="92%" icon={<CalendarCheck />} />
      </div>

      {/* Events Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Events</h2>
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
