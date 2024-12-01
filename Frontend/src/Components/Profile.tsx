import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const userId = localStorage.getItem('userId'); 
  const Localusername = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail'); 
  const PC = localStorage.getItem("PC"); 
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState<{ username: string; email: string; password: string }>({
    username: Localusername || '',
    email: userEmail || '',
    password: PC || '',
  });

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

      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('PC');
      setUser(null);
      setError('Your account has been deactivated.');
    } catch (err: any) {
      console.error(err);  
      setError(err.response?.data?.message || 'Failed to deactivate account');
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-slate-300 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user ? (
        <div>
          {!isEditing ? (
            <div>
              <p className="text-lg">Name: {Localusername}</p>
              <p className="text-lg">Email: {userEmail}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeActivate}
                  className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
                >
                  Deactivate
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
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
