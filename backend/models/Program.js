import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    weeks: {
      type: Number,
    },
    age: {
      type: Number, // Can be adjusted to Number if always numeric
    },
    duration: {
      type: String,
    },
    language: {
      type: String,
    },
    learningPath: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model('Program', programSchema);
