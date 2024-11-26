import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import logo from "./assets/logo.png";
import backgroundImage from "./assets/background-2.png";

const HeroSection = () => {
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const toggleCategoryDropdown = () => setShowCategoryDropdown(!showCategoryDropdown);

    return (
        <section
            className="bg-cover bg-center h-[200px]" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
        
            <img src={logo} className="w-64 h-48 mt-0 absolute  ml-20" alt="Logo" />

        
            <nav className="bg-gray-100 bg-opacity-70">
                <div className="flex items-center text-center ml-[800px] justify-between px-6 py-2">
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className="text-black hover:underline">Blogs</a>
                        </li>
                        <li>
                            <a href="/" className="text-black hover:underline">Trending</a>
                        </li>
                        <li>
                            <a href="/" className="text-black hover:underline">Latest</a>
                        </li>
                    </ul>
                    <div className="flex space-x-6 mt-2 mr-8">
                        <button className="bg-blue-600 rounded-2xl text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
                        <button className="bg-green-600 rounded-2xl text-white px-4 py-2 rounded hover:bg-green-600">Sign In</button>
                    </div>
                </div>
            </nav>

            <div className="flex space-x-4 text-center justify-center mt-8 ">
               
                <input
                    type="text"
                    placeholder="Search author..."
                    className="p-1 w-[400px] rounded-xl text-black"
                />
                 <IoIosSearch className="w-8 mt-2" size={20} />
    
                <div className="relative">
                    <button 
                        onClick={toggleCategoryDropdown} 
                        className="bg-gray-200 rounded-xl px-4 py-2 flex items-center"
                    >
                        Categories
                        <MdArrowDropDown className="ml-2" />
                    </button>
                    {showCategoryDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2">
                            <a href="/" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Technology</a>
                            <a href="/" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Health</a>
                            <a href="/" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Lifestyle</a>
                            <a href="/" className="block px-4 py-2 text-blue-500 hover:bg-gray-100">Business</a>
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
