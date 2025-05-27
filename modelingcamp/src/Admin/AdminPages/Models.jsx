import React, { useState } from "react";

const Models = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [newModel, setNewModel] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [selectedModel, setSelectedModel] = useState(null);

  // Handle form submit
  const handlePost = (e) => {
    e.preventDefault();

    const modelWithId = {
      ...newModel,
      id: Date.now().toString(),
    };

    setModels([...models, modelWithId]);
    setNewModel({ name: "", description: "", image: null });
  };

  // Handle image upload and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewModel((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtered list
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Models</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded-md"
      />

      {/* Add Model Form */}
      <form onSubmit={handlePost} className="space-y-4">
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
          onChange={(e) =>
            setNewModel({ ...newModel, description: e.target.value })
          }
          className="border p-2 w-full rounded-md"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Model
        </button>
      </form>

      {/* Model List */}
      <ul className="space-y-2">
        {filteredModels.map((model) => (
          <li
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className="cursor-pointer border p-3 rounded-md hover:bg-gray-100 flex items-center gap-4"
          >
            {model.image && (
              <img
                src={model.image}
                alt={model.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{model.name}</h2>
              <p className="text-sm text-gray-600 truncate">
                {model.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Detail View */}
      {selectedModel && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-bold mb-2">Model Details</h3>
          {selectedModel.image && (
            <img
              src={selectedModel.image}
              alt={selectedModel.name}
              className="w-48 h-48 object-cover rounded mb-4"
            />
          )}
          <p>
            <strong>Name:</strong> {selectedModel.name}
          </p>
          <p>
            <strong>Description:</strong> {selectedModel.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Models;
