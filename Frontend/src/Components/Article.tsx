import React, { useEffect, useState } from 'react';
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
  const {_id} = useParams();
  
  useEffect(() => {

    const fetchPostData = async () => {
      const response = await fetch(`http://localhost:3001/api/v1/guide/getGuidebyId/${_id}`);
      const res = await response.json();
      setPost(res.Guide);
     
    };
    
    fetchPostData();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
      <p className="text-lg text-gray-600 mt-2">{post.category}</p>
      
   
      <div className="mt-4">
        <img src={post.media} alt={post.title} className="w-full h-auto rounded-lg shadow-md" />
      </div>

      <p className="mt-4 text-base text-gray-800 leading-relaxed">{post.content}</p>
      <div className="mt-6 text-sm text-gray-600">
        <p>Likes: {post.likes}</p>
        <p>Comments: {post.comments}</p>
        <p>Posted on: {}</p>
      </div>
    </div>
  );
};

export default Article;
