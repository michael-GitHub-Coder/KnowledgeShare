import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsReplyAll } from 'react-icons/bs';
import { FaComments, FaLocationArrow, FaRegComment } from 'react-icons/fa6';
import { IoMdArrowBack } from 'react-icons/io';
import { MdOutlinePerson2 } from 'react-icons/md';
import { SlLike } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';

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

const ArticleInDash = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [likeIcon,setlikeIcon] = useState<boolean>(false);
  const [isOpen, setisopen] = useState<boolean>(false);
  const [ReplyisOpen, setReplyisopen] = useState<boolean>(false);
  const [GuidelikeIcon,guidesetlikeIcon] = useState<boolean>(false);
  const [guides, setGuides] = useState<any[]>([]);
  const [comment,setComment] = useState<string>("");
  const { _id } = useParams();
  const userId = localStorage.getItem("userId");
 const navigate = useNavigate();

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

  const handleLikeNumber = async () =>{

    try {
        const response = await fetch(`http://localhost:3001/api/v1/guide/like/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

    } catch (error: any) {
        
    }
  }
  const handleLikes = ()=>{
    setlikeIcon(!likeIcon);
  }
  const guidehandleLikes = ()=>{
    guidesetlikeIcon(!GuidelikeIcon);
  }

  const handleIsopen = ()=>{
        setisopen(!isOpen);
  }

  const handleReply = () =>{
        setReplyisopen(!ReplyisOpen);
  }

  const handleBack = ()=>{
    navigate("/Dashboard/ArticleInDash");
  }


  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
        toast.error("Comment cannot be empty.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/v1/guide/comment/${_id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment, userId }),
        });

        if (!response.ok) throw new Error('Failed to post comment');
        toast.success('Comment added successfully!');
        setComment('');
        fetchGuides(); 
    } catch (error) {
        console.error(error);
        toast.error('Error submitting comment.');
    }
};

  return (
    <div className="relative flex justify-center items-center min-h-screen ">
      <div className="absolute -top-1 flex flex-col lg:flex-row gap-10 container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* <button onClick={()=>handleBack()} className="absolute left-5 top-5"><IoMdArrowBack size={40} /></button> */}
        <div className="max-w-4xl mx-auto">
            <div>
                <img src={post.media} alt={post.title} className="w-full h-auto rounded-lg shadow-md" />
                <div className="flex py-4 gap-4">
                {GuidelikeIcon ? <button onClick={()=> guidehandleLikes()}><AiFillLike size={20} className="mt-1 cursor-pointer"/></button>  : <button onClick={()=> guidehandleLikes()}><AiOutlineLike size={20} className="mt-1 cursor-pointer"/></button> }
                <button onClick={()=>handleIsopen()}>
                    <FaRegComment size={20} className="mt-1 cursor-pointer"/>
                </button>
                </div>
                {isOpen && (
                   <div className="max-w-4xl">
                        <form onSubmit={handleComment}>                  
                            <div className="flex relative">
                                <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Comment.."
                                  className="bg-gray-100 h-[100px] focus:border-0 focus:ring-0 px-2 py-2 rounded-md w-full" 
                                  />
                                <button type="submit" className="absolute bottom-0 right-0 py-2 bg-gray-700 text-white px-4 rounded-md">Send</button>
                            </div>
                        </form>
                   </div>
                )}
            
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{post.category}</p>
          <p className="mt-4 text-base text-gray-800 leading-relaxed">{post.content.split("\n")}</p>
          
        </div>

        <div className="w-[350px] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
          <ul>
            {guides.map((data) => (
              <li key={data._id} className="">
                
               <div className="mt-1">
                  <h3 className="text-sm font-bold text-gray-900 flex"><MdOutlinePerson2 className="mt-1 text-black"/> {data.user_id.username}</h3>
                  <p className="text-base text-gray-700 bg-gray-100 px-1 py-2 rounded-md">{data.comment_text}</p>
                  <div className="flex pb-4 gap-4">
                    {likeIcon ? <button onClick={()=> {handleLikes();handleLikeNumber()}}><AiFillLike size={20} className="mt-1 cursor-pointer"/></button>  : <button onClick={()=> handleLikes()}><AiOutlineLike size={20} className="mt-1 cursor-pointer"/></button> }
                    <button onClick={()=> handleReply()}>
                        <BsReplyAll size={20} className="mt-1 cursor-pointer"/>
                    </button>
                    <p className="text-sm text-gray-500 mt-1">Posted on: {new Date(data.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    {ReplyisOpen && (
                       <form>
                            <div className="flex relative">
                                <textarea className="w-full px-2 py-1" placeholder="Reply" />
                                <button className="absolute bottom-0 right-0 py-2 bg-gray-700 text-white px-4 rounded-md">Send</button>
                            </div>
                       </form>
                    )}
                  </div>
               </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleInDash;
