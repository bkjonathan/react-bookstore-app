import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    caption: { type: String, default: '', trim: true },
    image: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
