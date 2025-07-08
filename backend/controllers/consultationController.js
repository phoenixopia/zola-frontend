import Consultation from '../models/Consultation.js';


// GET all consultations
export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ submittedAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createConsultation = async (req, res) => {
  try {
    const newConsultation = new Consultation(req.body);
    await newConsultation.save();
    res.status(201).json({ message: 'Consultation submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a consultation by ID
export const deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Consultation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};