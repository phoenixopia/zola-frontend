// controllers/testimonialController.js
import Testimonial from '../models/Testimonial.js';

export const createTestimonial = async (req, res) => {
  try {
    const { name, message, rating, photo } = req.body;

    if (!name || !message || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const testimonial = new Testimonial({ name, message, rating, photo });
    await testimonial.save();

    res.status(201).json({ message: 'Submitted! Pending approval.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ALL testimonials (admin)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
