import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const ManageGuides = () => {
  const [guides, setGuides] = useState([]);
  const [editGuide, setEditGuide] = useState(null);
  const [guideData, setGuideData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12; // Number of rows to display per page

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/guide/guideandnames"
        );
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  const handleEdit = (guide) => {
    setEditGuide(guide._id);
    setGuideData({
      title: guide.title,
      category: guide.category,
      content: guide.content,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuideData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/guide/update/${editGuide}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(guideData),
        }
      );

      if (response.ok) {
        alert("Guide updated successfully!");
        setGuides((prevGuides) =>
          prevGuides.map((guide) =>
            guide._id === editGuide ? { ...guide, ...guideData } : guide
          )
        );
        setEditGuide(null);
      } else {
        const errorData = await response.json();
        alert(`Error updating guide: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating guide:", error);
      alert("Failed to update guide. Please try again.");
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this guide? ${userId}`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/guide/delete/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Guide deleted successfully!");
        setGuides((prevGuides) =>
          prevGuides.filter((guide) => guide.userId._id !== userId)
        );
      } else {
        const errorData = await response.json();
        alert(`Error deleting guide: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting guide:", error);
      alert("Failed to delete guide. Please try again.");
    }
  };

  const totalPages = Math.ceil(guides.length / rowsPerPage);

  const displayedGuides = guides.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead  className="bg-gray-700 text-white">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedGuides.map((guide) => (
            <tr key={guide._id}>
              <td className="border px-4 py-2">{guide.title}</td>
              <td className="border px-4 py-2">{guide.userId?.username}</td>
              <td className="border px-4 py-2">{guide.category}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => handleEdit(guide)}
                  className="bg-gray-700 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guide.userId._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                >
                  < RiDeleteBinLine/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-gray-700 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {editGuide && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <h3 className="font-semibold mb-2">Edit Guide</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-2">
              <label className="block text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={guideData.title}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Category</label>
              <input
                type="text"
                name="category"
                value={guideData.category}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Content</label>
              <textarea
                name="content"
                value={guideData.content}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gray-700 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageGuides;
