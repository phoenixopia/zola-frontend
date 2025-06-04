import Program from "../models/Program.js";

// GET all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new program
export const createProgram = async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a program by ID
export const deleteProgram = async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

    //get program By Id

export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};