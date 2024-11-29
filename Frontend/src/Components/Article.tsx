import React, { useEffect, useState } from 'react';
import { MdOutlinePerson2 } from 'react-icons/md';
import { useParams } from 'react-router-dom';

interface Post {
  likes: string[];
  _id: string;
  userId: string;
  title: string;
  category: string;
  content: string;
  media: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

const Article = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [guides, setGuides] = useState<any[]>([]);
  const { _id } = useParams();

  const fetchGuides = async () => {
    const response = await fetch(`http://localhost:3001/api/v1/guide/UsersWithComments/${_id}`);
    const res = await response.json();
    setGuides(res.comments);
  };

  const fetchPostData = async () => {
    const response = await fetch(`http://localhost:3001/api/v1/guide/getGuidebyId/${_id}`);
    const res = await response.json();
    setPost(res.Guide);
  };

  useEffect(() => {
    fetchPostData();
    fetchGuides();
  }, [_id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-10 container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto">
          <img src={post.media} alt={post.title} className="w-full h-auto rounded-lg shadow-md" />
          <h1 className="text-3xl font-semibold text-gray-900 mt-5">{post.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{post.category}</p>
          <p className="mt-4 text-base text-gray-800 leading-relaxed">{post.content}</p>
          <div className="mt-6 text-sm text-gray-600">
            <p>Likes: {post.likes.length}</p>
            <p>Comments: {post.comments.length}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="w-[350px] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
          <ul>
            {guides.map((data) => (
              <li key={data._id} className="mt-4">
                <h3 className="text-sm font-bold text-gray-900 flex"><MdOutlinePerson2 className="mt-1 text-black"/> {data.user_id.username}</h3>
                <p className="text-base text-gray-700 bg-gray-100 px-1 py-2 rounded-md">{data.comment_text}</p>
                <p className="text-sm text-gray-500">Posted on: {new Date(data.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Article;
