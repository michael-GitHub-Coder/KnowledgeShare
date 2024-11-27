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
        <div className="py-4 px-8 text-xl"><Link to={"/Dashboard/Dash"} className="cursor-pointer">Dashboard</Link></div>
        <nav>
          
            {/* Expert */}
            { userRole === "Expert" &&
              <ul>
                <>
                
                <Link to={"/Dashboard/AddEditGuides"} className="cursor-pointer">
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Manage Guides</a>
                  </li>
                </Link>
                <Link to={"/Dashboard/Analytics"} className="cursor-pointer">
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Analytics</a>
                  </li>
                </Link>
                <Link to={"/Dashboard/profile"} className="cursor-pointer">
                  <li className="py-4 px-8 ">
                    <a className="cursor-pointer">Profile Settings</a>
                  </li>
                </Link>
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
              <Link to={"/Dashboard/ManageGuides"} className="cursor-pointer">
                <li className="py-4 px-8 ">
                  <a className="cursor-pointer">Manage Guides</a>
                </li>
              </Link>
              <Link to={"/Dashboard/PlatformStats"} className="cursor-pointer">
                <li className="py-4 px-8 ">
                  <a className="cursor-pointer">Platform Stats</a>
                </li>
              </Link>
              </ul>
            </>
            }
        </nav>
      </div>


      <div className="flex-1 p-6">
        <h1 className="text-2xl mb-10 px-5">Welcome to {userRole} Dashboard</h1>
        <div className="px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
