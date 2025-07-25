import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

export default function InterestsPage() {
  const [error, setError] = useState('');
  const [interest, setInterest] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterest();
  }, []);

  const fetchInterest = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/dPreference/`);
      setInterest(res.data);
    } catch (err) {
      setError('Failed to fetch interests', err);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setError('User not authenticated');
      return;
    }

    const payload = {
      user: userId,
      interest: selectedInterests,
    };

    try {
      await axios.post(`${API_URL}/api/preference/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/search');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save interests');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Select Your Interests
        </h2>

        <div className="space-y-4">
          {interest.map((item) => (
            <label
              key={item._id}
              className="flex items-center space-x-3 text-gray-700"
            >
              <input
                type="checkbox"
                value={item._id}
                checked={selectedInterests.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="capitalize">{item.interests}</span>
            </label>
          ))}
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
