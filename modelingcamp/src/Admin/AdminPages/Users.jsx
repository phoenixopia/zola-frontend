import React, { useEffect, useRef, useState } from 'react';

function Users() {
  const [consultations, setConsultations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const consultationsPerPage = 5;

  const printRef = useRef(null);
  const [showConfirmReject, setShowConfirmReject] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/consultations')
      .then(res => res.json())
      .then(data => {
        setConsultations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching consultations:', err);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Consultation</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
              background: #f9f9f9;
            }
            .card {
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 12px;
              background: white;
              max-width: 600px;
              margin: auto;
            }
            .label {
              font-weight: bold;
            }
            .value {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            ${printContents}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Pagination logic
  const indexOfLast = currentPage * consultationsPerPage;
  const indexOfFirst = indexOfLast - consultationsPerPage;
  const currentConsultations = consultations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(consultations.length / consultationsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Show confirmation modal
  const confirmReject = () => {
    setShowConfirmReject(true);
  };

  // Cancel rejection modal
  const cancelReject = () => {
    setShowConfirmReject(false);
  };

  // Delete consultation on confirmation
  const handleDeleteConfirmed = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/consultations/${selectedUser._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Failed to delete: ' + err.message);
        setShowConfirmReject(false);
        return;
      }

      setConsultations(prev => prev.filter(c => c._id !== selectedUser._id));
      setSelectedUser(null);
      setShowConfirmReject(false);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Error deleting consultation');
      setShowConfirmReject(false);
    }
  };

  if (loading) return <p className="text-center mt-8 text-lg">Loading consultations...</p>;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Consultation List</h2>

      {/* Users List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {consultations.length === 0 ? (
          <p className="text-gray-500">No consultations found.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {currentConsultations.map(c => (
                <li
                  key={c._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 gap-2"
                >
                  <div>
                    <p className="text-base sm:text-lg font-semibold">{c.fullName}</p>
                    <p className="text-gray-600 text-sm">{c.email}</p>
                    <p className="text-gray-500 text-xs">
                      Program: {c.selectedProgram || 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedUser(c)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
                  >
                    View Detail
                  </button>
                </li>
              ))}
            </ul>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-black text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-black text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Detail Card */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/50 p-4">
          <div className="relative w-full max-w-lg sm:max-w-xl bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold">Consultation Detail</h2>
              <p className="text-xs sm:text-sm opacity-90">
                {new Date(selectedUser.submittedAt).toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-3 right-4 text-white hover:text-gray-200 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 text-gray-800 space-y-4" ref={printRef}>
              <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Personal Info</h3>
                <p><span className="font-semibold">Full Name:</span> {selectedUser.fullName}</p>
                <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
                <p><span className="font-semibold">Phone:</span> {selectedUser.phone || '-'}</p>
              </section>

              <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Profile Details</h3>
                <p><span className="font-semibold">Gender:</span> {selectedUser.gender || '-'}</p>
                <p>
                  <span className="font-semibold">Date of Birth:</span>{' '}
                  {selectedUser.dateOfBirth
                    ? new Date(selectedUser.dateOfBirth).toLocaleDateString()
                    : '-'}
                </p>
                <p><span className="font-semibold">Instagram:</span> {selectedUser.instagram || '-'}</p>
              </section>

              <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Program Selection</h3>
                <p><span className="font-semibold">Selected Program:</span> {selectedUser.selectedProgram || '-'}</p>
              </section>

              <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Modeling Goals</h3>
                <p className="italic">{selectedUser.goals || 'No goals provided.'}</p>
              </section>
            </div>

            <div className="p-4 border-t print:hidden flex gap-2">
              <button
                onClick={confirmReject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Reject
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Print
              </button>
            </div>
          </div>

          {/* Confirmation Modal */}
          {showConfirmReject && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
                <p className="mb-4 text-lg font-semibold">Are you sure you want to reject this consultation?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeleteConfirmed}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Yes, Reject
                  </button>
                  <button
                    onClick={cancelReject}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
