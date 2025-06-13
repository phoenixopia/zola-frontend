import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

export default mongoose.model('Testimonial', testimonialSchema);