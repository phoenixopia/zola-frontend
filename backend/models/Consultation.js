import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: Date },
  instagram: { type: String },
  gender: { type: String, enum: ['female', 'male', 'other'] },
  goals: { type: String },
  selectedProgram: { type: String, required: true },  // <-- New field for program title
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Consultation', consultationSchema);
