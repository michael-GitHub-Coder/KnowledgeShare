import { useState } from 'react';

const AddEditGuide = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //  logic for submitting the form
    console.log({ title, category, content, media });
  };

  return (
    <div className=" mt-5 p-5 bg-gray-100 w-1/2  items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Add/Edit Guide</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Media Upload</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="bg-slate-600 text-white p-3 rounded-md">
          Save Guide
        </button>
      </form>
    </div>
  );
};

export default AddEditGuide;
