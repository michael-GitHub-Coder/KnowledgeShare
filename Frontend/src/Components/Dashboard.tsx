// Dashboard.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username")
  const userEmail = localStorage.getItem("userEmail")
  const userRole = localStorage.getItem("userRole")


console.log(`${userId} ${username} ${userEmail} ${userRole}`);
  
  
  return (
    <div className="flex">

      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="py-4 px-8 text-xl">Dashboard</div>
        <nav>
          <ul>
            {/* Expert */}
            { userRole === "Expert" &&

            <>
              <li className="py-4 px-8">
                <a>Manage Guides</a>
              </li>
              <li className="py-4 px-8">
                <a>Analytics</a>
              </li>
              <li className="py-4 px-8">
                <a>Profile Settings</a>
              </li>
            </>
            }
           
            {/* Admin */}
     
            { userRole === "Admin" &&
            <>
              <li className="py-4 px-8">
                <a>Manage Users</a>
              </li>
              <li className="py-4 px-8">
                <a>Manage Guides</a>
              </li>
              <li className="py-4 px-8">
                <a>Platform Stats</a>
              </li>
            </>
            }
        
          </ul>
        </nav>
      </div>

      {/* Main Content Area (Outlet) */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl">Welcome to your Dashboard</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
