import React, { useState, useEffect } from 'react';

const PlatformStats = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    recentActivity: [],
  });

 
  useEffect(() => {
    
    setTimeout(() => {
      setStats({
        totalUsers: 1500,
        activeSessions: 230,
        recentActivity: [
          { id: 1, description: 'User A logged in' },
          { id: 2, description: 'User B updated profile' },
          { id: 3, description: 'User C started a new project' },
        ],
      });
    }, 1000); 
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Platform Stats</h2>
      
      <div className="mb-4">
        <p className="text-lg">Total Users: <strong>{stats.totalUsers}</strong></p>
        <p className="text-lg">Active Sessions: <strong>{stats.activeSessions}</strong></p>
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-2">Recent Activity</h3>
        <ul className="list-disc pl-6">
          {stats.recentActivity.map(activity => (
            <li key={activity.id}>{activity.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlatformStats;
