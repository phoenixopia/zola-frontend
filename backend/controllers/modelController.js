import Model from "../models/Model.js";

export const createModel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imagePath = req.file?.path.replace(/\\/g, "/"); // Normalize Windows path

    const newModel = new Model({
      name,
      description,
      imageUrl: imagePath, // e.g., uploads/168392-dog.jpg
    });

    await newModel.save();
    res.status(201).json(newModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: "Error fetching models", error: err.message });
  }
};

export const deleteModel = async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    res.json({ message: "Model deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateModel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    model.name = name;
    model.description = description;

    if (req.file) {
      // delete old image
      if (model.imageUrl) {
        const filePath = path.resolve(model.imageUrl);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err.message);
        });
      }

      model.imageUrl = req.file.path.replace(/\\/g, "/");
    }

    await model.save();
    res.json(model);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};