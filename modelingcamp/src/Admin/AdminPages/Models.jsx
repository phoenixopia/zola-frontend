import React, { useEffect, useState } from "react";
import axios from "axios";

const Models = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [newModel, setNewModel] = useState({
    name: "",
    description: "",
    image: null,
  });

  const fetchModels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/models");
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models:", err.message);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newModel.name);
      formData.append("description", newModel.description);
      formData.append("image", newModel.image);

      await axios.post("http://localhost:5000/api/models", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewModel({ name: "", description: "", image: null });
      fetchModels();
    } catch (err) {
      console.error("Error uploading model:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/models/${id}`);
      fetchModels();
    } catch (err) {
      console.error("Error deleting model:", err.message);
    }
  };


  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Model Management</h1>

      {/* Upload Form */}
      <form onSubmit={handlePost} className="space-y-4 border p-4 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold">Upload New Model</h2>
        <input
          type="text"
          placeholder="Model name"
          value={newModel.name}
          onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
          className="border p-2 w-full rounded-md"
          required
        />
        <textarea
          placeholder="Model description"
          value={newModel.description}
          onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
          className="border p-2 w-full rounded-md"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewModel({ ...newModel, image: e.target.files[0] })}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Upload Model
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-full rounded-md"
      />

      {/* Model List */}
      <ul className="space-y-2">
        {filteredModels.map((model) => (
          <li
            key={model._id}
            className="border p-3 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between"
          >
            <div
              className="flex items-center gap-4 cursor-pointer flex-1"
            >
              {model.imageUrl && (
                <img
                  src={`http://localhost:5000/${model.imageUrl}`}
                  alt={model.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{model.name}</h2>
                <p className="text-sm text-gray-600 truncate">{model.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(model._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Models;
