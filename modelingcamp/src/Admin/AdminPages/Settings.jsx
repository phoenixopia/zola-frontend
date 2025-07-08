import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('');
  const [settings, setSettings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/settings');
      setSettings(res.data);
      setCurrentPage(1); // Reset to first page on fetch
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return setStatus('❌ Please select an image.');

    const formData = new FormData();
    formData.append('type', 'image');
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/settings', formData);
      setStatus('✅ Image uploaded successfully');
      setImage(null);
      fetchSettings();
    } catch (err) {
      setStatus('❌ Image upload failed');
      console.log(err);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) return setStatus('❌ Enter a video URL');

    try {
      await axios.post('http://localhost:5000/api/settings', {
        type: 'video',
        url: videoUrl,
      });
      setStatus('✅ Video added successfully');
      setVideoUrl('');
      fetchSettings();
    } catch (err) {
      setStatus('❌ Failed to add video');
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/settings/${id}`);
      setStatus('✅ Deleted successfully');
      fetchSettings();
    } catch (err) {
      setStatus('❌ Failed to delete');
      console.log(err);
    }
  };

  const convertToEmbedUrl = (url) => {
    let videoId = null;
    const standardMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);

    if (standardMatch) videoId = standardMatch[1];
    else if (shortsMatch) videoId = shortsMatch[1];

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getImageSrc = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `http://localhost:5000/${url}`;
  };

  const images = settings.filter(item => item.type === 'image');
  const videos = settings.filter(item => item.type === 'video');

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Settings</h2>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Image Upload */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Add Gallery Image</h3>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Upload Image
            </button>
          </form>
        </div>

        {/* Video Upload */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Add Video URL</h3>
          <form onSubmit={handleVideoSubmit} className="space-y-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Add Video
            </button>
          </form>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 border-b-2 border-blue-500 pb-2">Gallery Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-600">No images uploaded yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentImages.map(item => (
                <div key={item._id} className="relative border rounded shadow overflow-hidden">
                  <img
                    src={getImageSrc(item.imageUrl)}
                    alt="Gallery"
                    className="w-full h-40 sm:h-48 md:h-56 object-cover rounded"
                  />
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    title="Delete Image"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Videos Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 border-b-2 border-purple-600 pb-2">Videos</h3>
        {videos.length === 0 ? (
          <p className="text-gray-600">No videos added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map(item => (
              <div key={item._id} className="relative border rounded shadow overflow-hidden">
                {(item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be')) ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={convertToEmbedUrl(item.videoUrl)}
                      title="YouTube Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded"
                    />
                  </div>
                ) : (
                  <video
                    src={item.videoUrl}
                    controls
                    className="w-full h-48 rounded"
                  />
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  title="Delete Video"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {status && (
        <p className="mt-8 text-center text-gray-700 text-sm">{status}</p>
      )}
    </div>
  );
};

export default Settings;
