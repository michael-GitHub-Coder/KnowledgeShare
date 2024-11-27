import React, { useEffect, useState } from 'react';

const ManageUser = () => {
  const [AllUsers, setAllusers] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any>(null); 
  const PC = localStorage.getItem("PC");
  const [userData, setUserData] = useState({ email: "", username: "", role: "", status: "", password:PC }); 
  
  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/all");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      setAllusers(data.User); 
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []); // Only runs once when the component mounts

  const handleSuspend = async (id: string) => {
    console.log("Suspending user with id:", id);
    try {
      const res = await fetch(`http://localhost:3001/api/v1/user/suspend/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Suspended' }),  
      });

      if (!res.ok) {
        throw new Error(`Failed to suspend user: ${res.statusText}`);
      }

      // Re-fetch the user list after suspension
      await getAllUsers();
      alert('User account Suspended');
    } catch (error: any) {
      console.error('Error suspending user:', error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log(userData);
    try {
      const res = await fetch(`http://localhost:3001/api/v1/user/update/${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      if (!res.ok) {
        throw new Error(`Failed to update user: ${res.statusText}`);
      }

      const updatedUser = await res.json();
      console.log(updatedUser);
      setAllusers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );

      setEditUser(null); 
      setUserData({ email: '', username: '', role: '', status: '' ,password:PC}); 
      await getAllUsers(); 
    } catch (error: any) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">User Email</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {AllUsers.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">{user.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => {
                    setEditUser(user);
                    setUserData({
                      email: user.email,
                      username: user.username,
                      role: user.role,
                      status: user.status,
                      password:PC,
                    });
                  }}
                  className="mr-2 bg-blue-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleSuspend(user._id)} 
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editUser && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <h3 className="font-semibold mb-2">Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Role</label>
              <select
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="Expert">Expert</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm">Status</label>
              <select
                name="status"
                value={userData.status}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="InActive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <button
              type="submit"  // Changed to type="submit" to trigger form submission
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
