import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePro = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    weeks: "",
    age: "",
    duration: "",
    language: "",
    learningPath: "",
  });

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/programs");
      setPrograms(res.data);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/programs", newProgram);
      // Refetch list to update UI
      fetchPrograms();

      setNewProgram({
        title: "",
        description: "",
        weeks: "",
        age: "",
        duration: "",
        language: "",
        learningPath: "",
      });
    } catch (error) {
      console.error("Error adding program:", error);
      alert(error.response?.data?.message || "Failed to add program");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/programs/${id}`);
      // Refetch list after deletion
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Programs</h1>

      <form onSubmit={handleAddProgram} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Program title"
          value={newProgram.title}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Program description"
          value={newProgram.description}
          onChange={handleChange}
          className="border p-2 w-full rounded-md h-32"
          required
        />
        <input
          type="number"
          name="weeks"
          placeholder="Weeks"
          value={newProgram.weeks}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
        <input
          type="text"
          name="age"
          placeholder="Recommended Age"
          value={newProgram.age}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 2 hours/day)"
          value={newProgram.duration}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={newProgram.language}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
        <input
          type="text"
          name="learningPath"
          placeholder="Learning Path"
          value={newProgram.learningPath}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Program
        </button>
      </form>

      <ul className="space-y-4">
        {programs.length === 0 ? (
          <p className="text-gray-600">No programs added yet.</p>
        ) : (
          programs.map((program) => (
            <li
              key={program._id}
              className="border p-4 rounded-md flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold">{program.title}</h2>
                <p className="text-sm text-gray-700">{program.description}</p>
                <p className="text-sm">Weeks: {program.weeks}</p>
                <p className="text-sm">Age: {program.age}</p>
                <p className="text-sm">Duration: {program.duration}</p>
                <p className="text-sm">Language: {program.language}</p>
                <p className="text-sm">Learning Path: {program.learningPath}</p>
              </div>
              <button
                onClick={() => handleDelete(program._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CreatePro;
