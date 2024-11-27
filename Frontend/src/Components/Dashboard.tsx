import React, { useState } from 'react';
import { FaPerson } from 'react-icons/fa6';
import { MdOutlinePerson2 } from 'react-icons/md';
import { Outlet, NavLink } from 'react-router-dom';

const Dashboard = () => {

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username")
  const userEmail = localStorage.getItem("userEmail")
  const userRole = localStorage.getItem("userRole")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  console.log(`${userId} ${username} ${userEmail} ${userRole}`);
  
  return (
    <div className="flex">

      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="py-4 px-8 text-xl">
          <NavLink to={"/Dashboard/Dash"} className="cursor-pointer" activeClassName="bg-gray-600">Dashboard</NavLink>
        </div>
        <nav>
          {/* Expert */}
          {userRole === "Expert" && (
            <ul>
              <NavLink to={"/Dashboard/AddEditGuides"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  <a className="cursor-pointer">Manage Guides</a>
                </li>
              </NavLink>
              <NavLink to={"/Dashboard/Analytics"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  <a className="cursor-pointer">Analytics</a>
                </li>
              </NavLink>
              <NavLink to={"/Dashboard/profile"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  <a className="cursor-pointer">Profile Settings</a>
                </li>
              </NavLink>
            </ul>
          )}

          {/* Admin */}
          {userRole === "Admin" && (
            <ul>
              <NavLink to={"/Dashboard/ManageUser"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  Manage Users
                </li>
              </NavLink>
              <NavLink to={"/Dashboard/ManageGuides"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  <a className="cursor-pointer">Manage Guides</a>
                </li>
              </NavLink>
              <NavLink to={"/Dashboard/PlatformStats"} className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8">
                  <a className="cursor-pointer">Platform Stats</a>
                </li>
              </NavLink>
            </ul>
          )}
        </nav>
      </div>

      <div className="flex-1 p-6">
      <div className="flex justify-between px-5">
      <h1 className="text-2xl mb-10">Welcome to Dashboard</h1>
      <div className="flex gap-2 relative">
        <MdOutlinePerson2 className="mt-1" size={20} />
        <p
          className="cursor-pointer font-semibold"
          onClick={toggleDropdown}
        >
          {username}
        </p>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <ul>
              <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                Profile Settings
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                Change Password
              </li>
              <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
        <div className="px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
