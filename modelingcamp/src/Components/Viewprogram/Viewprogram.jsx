import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Viewprogram = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/programs/${id}`);
        setProgram(res.data);
      } catch (err) {
        console.log("Error fetching program:", err);
      }
    };

    fetchProgram();
  }, [id]);

  if (!program) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto bg-[#10131a] px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-500 hover:text-violet-800 font-semibold"
      >
        &larr; Go Back 
      </Link>

      <h1 className="text-4xl text-white font-bold mb-6">{program.title}</h1>

      {/* Summary Cards */}
      <div className="bg-white shadow-md rounded-3xl flex flex-wrap justify-center gap-8 py-6 text-center text-blue-500 font-medium text-lg mb-10">
        <div className="flex flex-col w-36  sm:w-40">
          <div className="text-3xl font-bold">{program.weeks}</div>
          <div className="text-gray-500 text-sm uppercase">Weeks</div>
        </div>
        <div className="flex flex-col w-36 sm:w-40">
          <div className="text-3xl font-bold">{program.age}</div>
          <div className="text-gray-500 text-sm uppercase">Recommended Age</div>
        </div>
        <div className="flex flex-col w-36 sm:w-40">
          <div className="text-3xl font-bold">{program.duration}</div>
          <div className="text-gray-500 text-sm uppercase">Duration</div>
        </div>
        <div className="flex flex-col w-36 sm:w-40">
          <div className="text-3xl font-bold">{program.language}</div>
          <div className="text-gray-500 text-sm uppercase">Language</div>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl text-white font-bold mb-4">Overview</h2>
        <p className="text-white leading-relaxed text-lg">{program.description}</p>
      </div>

      {/* Learning Path */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl text-white font-bold mb-4">Learning Path</h2>
        <p className="text-white leading-relaxed text-lg">{program.learningPath}</p>
      </div>

      {/* School Program Details */}
      <div className="mt-8 max-w-4xl mx-auto bg-gray-50 p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-blue-500">Class Types</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Seven months for <strong>Private Class</strong></li>
          <li>Ten months for <strong>Regular Class</strong></li>
          <li><strong>Online Class</strong> available</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-500">Regular Class Schedule</h2>
        <div className="text-gray-700 text-lg space-y-2">
          <p><strong>Tuesday & Thursday:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Session One: 8:00 - 10:00</li>
            <li>Session Two: 10:00 - 12:00</li>
            <li>Session Three: 12:00 - 2:00</li>
          </ul>
          <p><strong>Saturday:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Morning Class: 4:00 - 6:00</li>
            <li>Afternoon: 8:00 - 11:00 (includes vocal and acting)</li>
          </ul>
          <p><strong>Sunday:</strong> 4:00 - 6:00 (local time)</p>
        </div>

        <h2 className="text-2xl font-bold text-blue-500">Private Class Schedule</h2>
        <p className="text-gray-700 text-lg">
          Based on your interest and availability. All days are available with 6-time sessions per week.
        </p>

        <h2 className="text-2xl font-bold text-blue-500">Training Requirements</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Black trousers (Hijab for Muslim ladies)</li>
          <li>Black shoes for male trainees</li>
          <li>Black 5-inch shoes for female trainees</li>
          <li>Black & white T-shirt uniforms (provided by the school)</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-500">Payment Details</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Regular Class: <strong>4000 birr/month</strong></li>
          <li>Private Class: <strong>7000 birr/month</strong></li>
        </ul>
      </div>

      <button
        onClick={handleRegisterClick}
        className="mt-8 bg-blue-500 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors"
      >
        Register Here
      </button>
    </div>
  );
};

export default Viewprogram;
