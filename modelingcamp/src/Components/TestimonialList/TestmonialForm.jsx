import { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';

const TestimonialForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 0,
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = newRating => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.rating === 0) {
      setStatus('❌ Please provide a rating before submitting.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/testimonials', formData);
      setStatus('✅ Thank you! Your testimonial is pending approval.');
      setFormData({ name: '', message: '', rating: 0 });
    } catch (err) {
      setStatus('❌ Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 "
      onClick={onClose} // close modal if clicked outside form
    >
      <div
        className="bg-[#10131a] rounded-2xl shadow-lg p-6 max-w-xl w-full relative"
        onClick={e => e.stopPropagation()} // prevent closing if clicking inside form
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-red-500"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Leave a Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Write your experience here..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-yellow-500 font-semibold mb-1">
              Your Rating
            </label>
            <ReactStars
              count={5}
              size={30}
              value={formData.rating}
              onChange={handleRatingChange}
              color2={'#facc15'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {status && (
            <p
              role="alert"
              aria-live="polite"
              className={`text-center text-sm font-medium mt-2 ${
                status.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
