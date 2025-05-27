// Dashboard.jsx
import StatCard from "../StatCard";
import { Users, BookOpen, DollarSign, CalendarCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatCard
        title="Total Students"
        value="350"
        icon={<Users />}
      />
      <StatCard
        title="Total Teachers"
        value="45"
        icon={<BookOpen />}
      />
      <StatCard
        title="Fees Collected"
        value="$15,000"
        icon={<DollarSign />}
      />
      <StatCard
        title="Today’s Attendance"
        value="92%"
        icon={<CalendarCheck />}
      />
    </div>
  );
};

export default Dashboard;