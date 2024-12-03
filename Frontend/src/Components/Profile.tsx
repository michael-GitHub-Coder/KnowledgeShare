import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const Localusername = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const PC = localStorage.getItem('PC');
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{ username: string; email: string; password: string }>(
    {
      username: Localusername || '',
      email: userEmail || '',
      password: PC || '',
    }
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError('User ID is missing');
        return;
      }
      try {
        const { data } = await axios.get(`/api/v1/user/profile/${userId}`);
        setUser(data);
        setFormData({
          username: data.username || Localusername || '',
          email: data.email || userEmail || '',
          password: PC || '',
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();

    return () => setUser(null);
  }, [userId, Localusername, userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!userId) {
      setError('User ID is required to update profile.');
      return;
    }
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/v1/user/update/${userId}`,
        formData
      );

      setUser(data);
      setIsEditing(false);

      localStorage.setItem('username', data.User.username);
      localStorage.setItem('userEmail', data.User.email);

      setFormData({
        username: formData.username,
        email: formData.email,
        password: PC || '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: user?.username || Localusername || '',
      email: user?.email || userEmail || '',
      password: PC || '',
    });
  };

  const handleDeActivate = async () => {
    if (!userId) {
      setError('User ID is required to deactivate account.');
      return;
    }
    try {
      await axios.post(`http://localhost:3001/api/v1/user/deactivate/${PC}`);

      localStorage.clear();
      setUser(null);
      setError('Your account has been deactivated.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to deactivate account');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center ">Profile</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {user ? (
          <div>
            {!isEditing ? (
              <div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700">{Localusername}</div>
                  <div className="text-gray-500 text-sm">{userEmail}</div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 px-4 bg-gray-700  text-white rounded-lg shadow-md hover:bg-gray-600"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDeActivate}
                    className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
                  >
                    Deactivate Account
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
