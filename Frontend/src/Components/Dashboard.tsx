// Dashboard.js
import React from 'react';
import { Outlet, Link,useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username")
  const userEmail = localStorage.getItem("userEmail")
  const userRole = localStorage.getItem("userRole")
  const navigate = useNavigate();
  const handleManageUsersClick = () => {
    navigate('/Dashboard/ManageUser');
    console.log("hello")
  };
console.log(`${userId} ${username} ${userEmail} ${userRole}`);
  
  
  return (
    <div className="flex">

      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="py-4 px-8 text-xl">Dashboard</div>
        <nav>
          
            {/* Expert */}
            { userRole === "Expert" &&
              <ul>
                <>
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Manage Guides</a>
                  </li>
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Analytics</a>
                  </li>
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Profile Settings</a>
                  </li>
                
                </>
             </ul>
            }
           
            {/* Admin */}
     
            { userRole === "Admin" &&
            <>
            <ul>
              <Link to={"/Dashboard/ManageUser"} className="cursor-pointer">
                <li className="py-4 px-8 ">
                  Manage Users
                </li>
              </Link>
                <li className="py-4 px-8 ">
                  <a className="cursor-pointer">Manage Guides</a>
                </li>
                <li className="py-4 px-8 ">
                  <a className="cursor-pointer">Platform Stats</a>
                </li>
              </ul>
            </>
            }
        </nav>
      </div>

      {/* Main Content Area (Outlet) */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl mb-10">Welcome to your Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
