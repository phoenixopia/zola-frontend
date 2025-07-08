import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search & sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('createdAt'); // or 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  // Reject confirmation modal state
  const [testimonialToReject, setTestimonialToReject] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials/all");
        setTestimonials(res.data);
      } catch (err) {
        console.log(err);
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

  const handleRejectConfirmed = async () => {
    if (!testimonialToReject) return;
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${testimonialToReject}`);
      setTestimonials(prev => prev.filter(t => t._id !== testimonialToReject));
      setTestimonialToReject(null);
    } catch (err) {
      console.error('Error deleting:', err);
      setTestimonialToReject(null);
    }
  };

  // Filter
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [testimonials, searchTerm]);

  // Sort
  const sortedTestimonials = useMemo(() => {
    return [...filteredTestimonials].sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      if (sortKey === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTestimonials, sortKey, sortOrder]);

  // Pagination
  const totalItems = sortedTestimonials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages, currentPage]);

  const currentTestimonials = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTestimonials.slice(start, start + itemsPerPage);
  }, [sortedTestimonials, currentPage, itemsPerPage]);

  if (loading) return <p className="text-center mt-10">Loading testimonials...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Testimonials</h2>

      {/* Search, Sort, Pagination Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or message..."
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sortKey" className="font-medium">Sort by:</label>
          <select
            id="sortKey"
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="createdAt">Date</option>
            <option value="rating">Rating</option>
          </select>

          <button
            onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {/* Items per page */}
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="font-medium">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[5, 10, 15, 20].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>per page</span>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-6">
        {currentTestimonials.length === 0 && (
          <p className="text-center text-gray-600">No testimonials found.</p>
        )}
        {currentTestimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="p-4 bg-white rounded-lg shadow border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  testimonial.approved
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
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
              <span className="text-sm text-gray-500">
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </span>
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
                onClick={() => setTestimonialToReject(testimonial._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <span key={pageNum} className="px-2">...</span>;
            }
            return null;
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {testimonialToReject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Rejection</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to reject this testimonial?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRejectConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Reject
              </button>
              <button
                onClick={() => setTestimonialToReject(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
