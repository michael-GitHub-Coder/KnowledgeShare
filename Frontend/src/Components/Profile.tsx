import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const userId = localStorage.getItem('userId'); // User ID from localStorage
  const Localusername = localStorage.getItem('username'); // Username from localStorage
  const userEmail = localStorage.getItem('userEmail'); 
  const PC = localStorage.getItem("PC");// User Email from localStorage

  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit mode
  const [formData, setFormData] = useState<{ username: string; email: string; password:PC }>({
    username: Localusername || '',
    email: userEmail || '',
    password:PC || '',
  });

  // Fetch user profile on component mount
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
          password: PC,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();

    // Cleanup function if the component is unmounted
    return () => setUser(null);
  }, [userId, Localusername, userEmail]); // Dependency on userId, username, and userEmail

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Use 'name' here to match the input name attributes
    });
  };

  // Handle save profile
  const handleSave = async () => {

    // console.log(formData)
    if (!userId) {
      setError('User ID is required to update profile.');
      return;
    }
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/v1/user/update/${userId}`,
        formData
      );
      // Update user state with the new data
      console.log(data.User)
      setUser(data);
      setIsEditing(false); // Close the edit form

      // Update localStorage with new values
      localStorage.setItem('username', data.User.username);
      localStorage.setItem('userEmail', data.User.email);

      // Optionally update the form data to reflect the saved data
      setFormData({
        username: formData.username,
        email: formData.email,
        password:PC,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false); // Close the edit form without saving
    setFormData({
      username: user?.username || Localusername || '',
      email: user?.email || userEmail || '',
      password:PC,
    }); // Reset form data to initial state
  };

//   const handleDeActivate = () =>{

//     const de
//     useEffect(()=>{

//     },[])
//   }

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
                    // onClick={() handleDeActivate()}
                    className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
                >
                    Deactive
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
