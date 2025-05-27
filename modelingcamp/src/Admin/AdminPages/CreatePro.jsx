import React, { useState } from "react";

const CreatePro = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ title: "", description: "" });

  // Handle form submission to add a new program
  const handleAddProgram = (e) => {
    e.preventDefault();
    const programWithId = {
      ...newProgram,
      id: Date.now().toString(),
    };
    setPrograms([...programs, programWithId]);
    setNewProgram({ title: "", description: "" });
  };

  // Handle delete
  const handleDelete = (id) => {
    setPrograms(programs.filter((program) => program.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Programs</h1>

      {/* Add Program Form */}
      <form onSubmit={handleAddProgram} className="space-y-4">
        <input
          type="text"
          placeholder="Program title"
          value={newProgram.title}
          onChange={(e) =>
            setNewProgram({ ...newProgram, title: e.target.value })
          }
          className="border p-2 w-full rounded-md"
          required
        />
        <textarea
          placeholder="Program description"
          value={newProgram.description}
          onChange={(e) =>
            setNewProgram({ ...newProgram, description: e.target.value })
          }
          className="border p-2 w-full rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Program
        </button>
      </form>

      {/* Program List */}
      <ul className="space-y-4">
        {programs.length === 0 ? (
          <p className="text-gray-600">No programs added yet.</p>
        ) : (
          programs.map((program) => (
            <li
              key={program.id}
              className="border p-4 rounded-md flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold">{program.title}</h2>
                <p className="text-sm text-gray-700">{program.description}</p>
              </div>
              <button
                onClick={() => handleDelete(program.id)}
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
