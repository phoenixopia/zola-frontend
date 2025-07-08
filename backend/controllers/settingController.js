import Setting from '../models/Settings.js';

export const createSetting = async (req, res) => {
  try {
    const { type } = req.body;

    if (type === 'image') {
      if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

      // Save relative path only
      const imageUrl = `uploads/${req.file.filename}`;
      const newImage = new Setting({ type: 'image', imageUrl });
      await newImage.save();

      return res.status(201).json({ message: 'Image uploaded', imageUrl });
    }

    if (type === 'video') {
      const { url } = req.body;
      if (!url) return res.status(400).json({ message: 'Video URL is required' });

      const newVideo = new Setting({ type: 'video', videoUrl: url });
      await newVideo.save();

      return res.status(201).json({ message: 'Video added', videoUrl: url });
    }

    res.status(400).json({ message: 'Invalid type' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get all settings (images + videos)
export const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find().sort({ createdAt: -1 });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete setting by id
export const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findByIdAndDelete(req.params.id);
    if (!setting) return res.status(404).json({ message: "Setting not found" });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};