import React from 'react';
import { FaGreaterThan } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { MdOutlinePerson2 } from "react-icons/md";


type CardProps = {
    image: string;
    title: string;
    content: string;
  };
  
const Card = ({image,title,content}: CardProps) => {

   const words = content.split(' '); 
   const first13Words = words.slice(0, 13).join(' '); 

  return (
    <div className="flex justify-center mt-[100px] ">
      <div className="relative shadow-lg">
        <div className="relative bg-gray-100 w-[350px] h-[250px] mr-[10%]">
          <img src={image} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 p-2  bg-opacity-50">
            <p className="bg-red-500 text-white font-bold px-2 py-2 text-center">28</p>
            <p className="bg-white text-black font-bold px-2 py-2 text-center">Nov</p>
          </div>
        </div>
        <div className="absolute bg-white h-[268px] w-[320px] top-[80%] -right-[10%] left-0 z-10 shadow-sm p-5 text-gray-500 px-5">
            <div className="flex gap-4 border-b border-b-gray-500 pb-1 ">
                <p className="flex gap-2"><MdOutlinePerson2 className="mt-1"/> Michael T.</p>
                <p className="flex gap-2"><FaComments className="mt-1"/>Comments. (5)</p>
            </div>
            <h1 className="py-4 font-bold text-black">{title}</h1>
            <p className="pb-4">{first13Words}...</p>
            <p className="absolute bottom-2 pb-4 flex gap-2 font-bold text-black">Read More <FaGreaterThan size={10} className="mt-2"/></p>
        </div>
      </div>
    </div>
  );
}

export default Card;
