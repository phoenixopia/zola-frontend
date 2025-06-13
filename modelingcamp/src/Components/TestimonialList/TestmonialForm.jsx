import { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 0,
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/testimonials', formData);
      setStatus('✅ Thank you! Your testimonial is pending approval.');
      setFormData({ name: '', message: '', rating: 0 });
    } catch (err) {
      setStatus('❌ Failed to submit. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-[#10131a] rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Leave a Testimonial</h2>
      
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
          <label className="block text-white font-semibold mb-1">Your Message</label>
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
          <label className="block text-yellow-500 font-semibold mb-1">Your Rating</label>
          <ReactStars
            count={5}
            size={30}
            value={formData.rating}
            onChange={handleRatingChange}
            color2={'#facc15'} // Tailwind yellow-400
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
        >
          Submit
        </button>

        {status && (
          <p className="text-center text-sm text-green-600 font-medium mt-2">{status}</p>
        )}

        <Link to="/" className="block text-center text-sm text-blue-600 hover:underline mt-4">
          ← Back to Testimonials
        </Link>
      </form>
    </div>
  );
};

export default TestimonialForm;
