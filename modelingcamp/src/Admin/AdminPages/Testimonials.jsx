import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all testimonials (including unapproved)
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials/all");
        setTestimonials(res.data);
      } catch (err) {
        console.log( err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/testimonials/${id}/approve`);
      setTestimonials(prev =>
        prev.map(t => (t._id === id ? { ...t, approved: true } : t))
      );
    } catch (err) {
      console.error('Error approving:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading testimonials...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Testimonials Panel</h2>
      <div className="space-y-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="p-4 bg-white rounded-lg shadow border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  testimonial.approved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {testimonial.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
            <p className="mb-2 text-gray-700">{testimonial.message}</p>
            <div className="flex items-center justify-between">
              <ReactStars
                count={5}
                size={20}
                value={testimonial.rating}
                edit={false}
                color2={'#facc15'}
              />
              <span className="text-sm text-gray-500">{new Date(testimonial.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-4 flex gap-3">
              {!testimonial.approved && (
                <button
                  onClick={() => handleApprove(testimonial._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleReject(testimonial._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
