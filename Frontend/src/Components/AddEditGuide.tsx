import React, { useState, useEffect } from "react";

const AddEditGuide = () => {
  const userId = localStorage.getItem("userId"); 
  const [guides, setGuides] = useState([]);
  const [editGuide, setEditGuide] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); 
  const [guideData, setGuideData] = useState({
    title: "",
    category: "",
    content: "",
    media: "",
  });

  // Fetch guides for the logged-in user
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/guide/guideandnames"
        );
        const data = await response.json();
        // Filter guides based on the userId from localStorage
        const filteredGuides = data.filter((guide) => guide.userId._id === userId);
        setGuides(filteredGuides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuideData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new guide
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/guide/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ ...guideData,userId}),
      });
      
      console.log(guideData)

      if (response.ok) {
        const newGuide = await response.json();
        alert("Guide added successfully!");
        setGuides((prevGuides) => [...prevGuides, newGuide]);
        setGuideData({
          title: "",
          category: "",
          content: "",
          media: "",
        });
        setShowAddForm(false); // Close the form
      } else {
        const errorData = await response.json();
        alert(`Error adding guide: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding guide:", error);
      alert("Failed to add guide. Please try again.");
    }
  };

  // Handle editing a guide
  const handleEdit = (guide) => {
    setEditGuide(guide._id);
    setGuideData({
      title: guide.title,
      category: guide.category,
      content: guide.content,
      media: guide.media || "",
    });
  };

  // Submit the edited guide data
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

  // Handle guide deletion
  const handleDelete = async (guideId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this guide?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/guide/delete/${guideId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Guide deleted successfully!");
        setGuides((prevGuides) =>
          prevGuides.filter((guide) => guide._id !== guideId)
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

  return (
    <div>
      <div className="pb-4 flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
        >
          Add Guide
        </button>
      </div>
      {/* Display the guides in a table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide._id}>
              <td className="border px-4 py-2">{guide.title}</td>
              <td className="border px-4 py-2">{guide.userId?.username}</td>
              <td className="border px-4 py-2">{guide.category}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => handleEdit(guide)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guide._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display edit form if a guide is being edited */}
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Display add form if adding a new guide */}
      {showAddForm && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <h3 className="font-semibold mb-2">Add Guide</h3>
          <form onSubmit={handleAddSubmit}>
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
            <div className="mb-2">
              <label className="block text-sm">Media (optional)</label>
              <input
                type="text"
                name="media"
                value={guideData.media}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Add Guide
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEditGuide;
