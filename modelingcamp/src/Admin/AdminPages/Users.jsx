import React, { useEffect, useState } from 'react';

function Users() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/consultations')  // Make sure the endpoint matches your backend
      .then(res => res.json())
      .then(data => {
        setConsultations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching consultations:', err);
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading consultations...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Consultations</h2>

      {consultations.length === 0 ? (
        <p className="text-gray-500">No consultations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-black bg-opacity-30 text-white text-left">
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Date of Birth</th>
                <th className="p-3">Instagram</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Goals</th>
                <th className="p-3">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c, idx) => (
                <tr
                  key={c._id}
                  className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="p-3">{c.fullName}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone || '-'}</td>
                  <td className="p-3">
                    {c.dateOfBirth
                      ? new Date(c.dateOfBirth).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-3">{c.instagram || '-'}</td>
                  <td className="p-3">{c.gender || '-'}</td>
                  <td className="p-3">{c.goals || '-'}</td>
                  <td className="p-3">
                    {new Date(c.submittedAt).toLocaleString()}
                  </td>
                      
                  <td className="p-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    contact
                  </a>
                </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
