import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"  // Or whatever your route is for the programs list
        className="inline-block mb-6 text-violet-600 hover:text-violet-800 font-semibold"
      >
        &larr; Go Back 
      </Link>

      <h1 className="text-4xl font-bold mb-6">{program.title}</h1>

      {/* Summary Cards */}
      <div className="bg-white shadow-md rounded-3xl flex flex-wrap justify-center gap-8 py-6 text-center text-violet-600 font-medium text-lg mb-10">
        <div className="flex flex-col w-36 sm:w-40">
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

      {/* Overview Section */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{program.description}</p>
      </div>

      {/* Learninig Path */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{program.learningPath}</p>
      </div>


      <button
    onClick={handleRegisterClick}
    className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors">
    Register Here
    </button>


    </div>
  );
};

export default Viewprogram;
