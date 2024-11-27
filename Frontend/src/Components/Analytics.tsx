import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

  //Hard Coded stats
  const Analytics = () => {
    const data = [
      { name: 'Guide 1', views: 400, likes: 200, comments: 50 },
      { name: 'Guide 2', views: 700, likes: 400, comments: 100 },
      { name: 'Guide 3', views: 300, likes: 100, comments: 20 },
    ];
  
    return (
      <div className="p-5  bg-gray-100 ">
        <h2 className="text-4xl font-bold mb-6">ANALYTICS</h2>
  
        {/* Line Chart Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Views, Likes, and Comments per Guide</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis className='font-bold' dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" />
              <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
              <Line type="monotone" dataKey="comments" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Table Section */}
        <div>
          <h3 className="text-3xl font-bold mb-4">GUIDE INTERACTION TABLE</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 px-4 py-2 ">Guide</th>
                <th className="border border-gray-300 px-4 py-2">Views</th>
                <th className="border border-gray-300 px-4 py-2">Likes</th>
                <th className="border border-gray-300 px-4 py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.views}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.likes}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Analytics;
  