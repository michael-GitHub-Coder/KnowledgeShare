// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State for toggling the edit form
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile');
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle save profile
  const handleSave = async () => {
    try {
      const { data } = await axios.put('/api/users/profile', formData);
      setUser(data); // Update user state with the new data
      setIsEditing(false); // Close the edit form
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false); // Close the edit form without saving
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-slate-300 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user ? (
        <div>
          {!isEditing ? (
            <div>
              <p className="text-lg">Name: {user.name}</p>
              <p className="text-lg">Email: {user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
