import React, { useState, useEffect } from "react";
import StatCard from "../StatCard";
import { Users, BookOpen, Layers, FileText } from "lucide-react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const [blogError, setBlogError] = useState(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [blogToDelete, setBlogToDelete] = useState(null);

  // --- Fetch Users ---
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/consultations");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // --- Fetch Programs ---
  const fetchPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    } finally {
      setLoadingPrograms(false);
    }
  };

  // --- Fetch Blogs ---
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setBlogError("Failed to load blogs");
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPrograms();
    fetchBlogs();
  }, []);

  // --- Handle New Blog ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setCreateError("");
    if (!newBlog.title || !newBlog.description || !newBlog.date) {
      setCreateError("Please fill all fields");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create blog");
      }
      const createdBlog = await res.json();
      setEvents((prev) => [createdBlog, ...prev]);
      setNewBlog({ title: "", description: "", date: "" });
    } catch (error) {
      setCreateError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const confirmDeleteBlog = (id) => {
    setBlogToDelete(id);
  };

  const cancelDelete = () => {
    setBlogToDelete(null);
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${blogToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete blog");
      }
      setEvents((prev) => prev.filter((blog) => blog._id !== blogToDelete));
    } catch (error) {
      alert("Error deleting blog: " + error.message);
    } finally {
      setBlogToDelete(null);
    }
  };

  // --- Gender Chart ---
  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(genderCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 30,
      },
    ],
  };

  // --- Program Chart ---
  const programCounts = users.reduce((acc, user) => {
    const programTitle = user.selectedProgram || "Unknown Program";
    acc[programTitle] = (acc[programTitle] || 0) + 1;
    return acc;
  }, {});

  const programChartData = {
    labels: Object.keys(programCounts),
    datasets: [
      {
        label: "Students per Program",
        data: Object.values(programCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="p-4 space-y-6 max-w-full">
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={users.length} icon={<Users />} />
        <StatCard title="Total Programs" value={programs.length} icon={<Layers />} />
        <StatCard title="Total Blogs" value={events.length} icon={<FileText />} />
        <StatCard title="Total Teachers" value="5" icon={<BookOpen />} />
      </div>

      {/* --- Charts Section --- */}
      {loadingUsers ? (
        <p className="text-center text-gray-600">Loading charts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Pie */}
          <div className="p-4 border rounded shadow-sm">
            <h4 className="text-center font-semibold mb-4 text-xl">Gender Distribution</h4>
            <div className="h-80">
              <Pie data={genderChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Program Bar */}
          <div className="p-4 border rounded shadow-sm">
            <h4 className="text-center font-semibold mb-4 text-xl">Students per Program</h4>
            <div className="h-80">
              <Bar data={programChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}

      {/* --- Create Blog Form --- */}
      <div className="p-4 border rounded shadow-sm max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Blog</h2>
        {createError && <p className="text-red-600 mb-2 text-center">{createError}</p>}
        <form onSubmit={handleCreateBlog} className="space-y-4">
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={newBlog.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
          <input
            type="date"
            name="date"
            value={newBlog.date}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>

      {/* --- Blog List --- */}
      <div>
        <h2 className="text-xl font-bold mb-4 sm:text-2xl">Blogs</h2>
        {loadingBlogs ? (
          <p className="text-gray-600">Loading blogs...</p>
        ) : blogError ? (
          <p className="text-red-600">{blogError}</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No active Blogs.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="p-4 border rounded shadow-sm flex justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-700">{event.description}</p>
                  <p className="text-xs text-gray-500">Date: {event.date}</p>
                </div>
                <button
                  onClick={() => confirmDeleteBlog(event._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {blogToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="px-4 py-2 border rounded">
                No
              </button>
              <button
                onClick={handleDeleteBlog}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
