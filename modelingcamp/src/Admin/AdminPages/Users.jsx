import React, { useEffect, useRef, useState } from 'react';

function Users() {
  const [consultations, setConsultations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

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

  if (loading) return <p className="text-center mt-8 text-lg">Loading consultations...</p>;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Consultation List</h2>

      {/* Users List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {consultations.length === 0 ? (
          <p className="text-gray-500">No consultations found.</p>
        ) : (
          <ul className="space-y-4">
            {consultations.map(c => (
              <li
                key={c._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 gap-2"
              >
                <div>
                  <p className="text-base sm:text-lg font-semibold">{c.fullName}</p>
                  <p className="text-gray-600 text-sm">{c.email}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(c)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
                >
                  View Detail
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detail Card */}
     {selectedUser && (
  <div
    /*  overlay  */
    className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/50 p-4"
  >
    <div
      /*  card  */
      className="relative w-full max-w-lg sm:max-w-xl bg-white border border-gray-200 rounded-2xl shadow-2xl
                 max-h-[90vh] overflow-y-auto my-8"
    >
      {/* Header (sticky so ✕ is always visible) */}
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

      {/* Card Body */}
      <div className="p-4 sm:p-6 text-gray-800 space-y-4" ref={printRef}>
        {/* Personal Info */}
        <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Personal Info
          </h3>
          <p><span className="font-semibold">Full Name:</span> {selectedUser.fullName}</p>
          <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
          <p><span className="font-semibold">Phone:</span> {selectedUser.phone || '-'}</p>
        </section>

        {/* Profile Details */}
        <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Profile Details
          </h3>
          <p><span className="font-semibold">Gender:</span> {selectedUser.gender || '-'}</p>
          <p><span className="font-semibold">Date of Birth:</span> {selectedUser.dateOfBirth
            ? new Date(selectedUser.dateOfBirth).toLocaleDateString()
            : '-'}</p>
          <p><span className="font-semibold">Instagram:</span> {selectedUser.instagram || '-'}</p>
        </section>

        {/* Goals */}
        <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Modeling Goals
          </h3>
          <p className="italic">
            {selectedUser.goals || 'No goals provided.'}
          </p>
        </section>
      </div>

      {/* Footer Buttons */}
    
        
        <div className="p-4 border-t print:hidden">
  <button
    onClick={handlePrint}
    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
  >
    Print
  </button>
</div>
      
    </div>
  </div>
)}

    </div>
  );
}

export default Users;
