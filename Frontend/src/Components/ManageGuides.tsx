import React, { useState, useEffect } from 'react';

const ManageGuides = () => {
  const [guides, setGuides] = useState([]);

  
  useEffect(() => {
    const fetchGuides = async () => {
      const response = await fetch("http://localhost:3001/api/v1/guide/guideandnames");
      const data = await response.json();
      setGuides(data);
    };
    fetchGuides();
  }, []);


  return (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {/* <th className="border px-4 py-2">Guide ID</th> */}
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide._id}>
              {/* <td className="border px-4 py-2">{guide.id}</td> */}
              <td className="border px-4 py-2">{guide.title}</td>
              <td className="border px-4 py-2">{guide.userId.username}</td>
              <td className="border px-4 py-2">{guide.category}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button 
                //   onClick={() => handleEdit(guide.id)} 
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button 
                //   onClick={() => handleDelete(guide.id)} 
                  className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManageGuides
