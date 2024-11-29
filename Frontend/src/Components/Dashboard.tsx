import React, { useEffect, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { FaPerson } from 'react-icons/fa6';
import { IoStatsChartOutline } from 'react-icons/io5';
import { MdOutlineManageAccounts, MdOutlinePerson2 } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { SiAwssecretsmanager } from 'react-icons/si';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

 
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/logout", {
        method: 'POST', 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

     
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('PC'); 

      navigate('/');
    } catch (error) {
      console.error(error.message || 'Logout failed');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  console.log(`${userId} ${username} ${userEmail} ${userRole}`);

  return (

    <div className="flex">

      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="font-bold py-8 px-8 text-xl bg-gray-950 rounded-md flex gap-2">
          <RxDashboard className="mt-1"/>
          <NavLink to="/Dashboard/ArticleInDash" className="cursor-pointer" activeClassName="bg-gray-600 ">
            Dashboard 
          </NavLink>
        </div>
        <nav>
          {/* Expert */}
          {userRole === "Expert" && (
            <ul>
              <NavLink to="/Dashboard/AddEditGuides" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><SiAwssecretsmanager className="mt-1"/> Manage Guides</li>
              </NavLink>
              <NavLink to="/Dashboard/Analytics" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><TbBrandGoogleAnalytics className="mt-1" /> Analytics</li>
              </NavLink>
              <NavLink to="/Dashboard/profile" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><CiSettings className="mt-1" />Profile</li>
              </NavLink>
            </ul>
          )}

          {/* Admin */}
          {userRole === "Admin" && (
            <ul>
              <NavLink to="/Dashboard/ManageUser" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><MdOutlineManageAccounts className="mt-1" /> Manage Users</li>
              </NavLink>
              <NavLink to="/Dashboard/ManageGuides" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><SiAwssecretsmanager className="mt-1" /> Manage Guides</li>
              </NavLink>
              <NavLink to="/Dashboard/PlatformStats" className="cursor-pointer" activeClassName="bg-gray-600">
                <li className="py-4 px-8 flex gap-2 hover:bg-gray-950 hover:rounded-md"><IoStatsChartOutline className="mt-1" /> Platform Stats</li>
              </NavLink>
            </ul>
          )}
        </nav>
      </div>

      <div className="flex-1 p-6 bg-gray-300 h-screen overflow-auto">
        <div className="flex justify-between px-5">
          <h1 className="text-2xl mb-10 font-semibold">Welcome to {userRole} Dashboard</h1>
          <div className="flex gap-2 relative">
            {username && <MdOutlinePerson2 className="mt-1" size={20} />}
            <p className="cursor-pointer font-semibold" onClick={toggleDropdown}>
              {username}
            </p>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-5 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg">
                <ul>
                  <li onClick={handleLogout} className="py-2 px-4 hover:bg-gray-950 hover:rounded-md cursor-pointer">
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 ">
          <Outlet />
        </div>
      </div>
    </div>
)};

export default Dashboard;
