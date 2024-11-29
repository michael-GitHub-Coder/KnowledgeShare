import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import leftback from "../assets/leftback.png";
import bg7 from "../assets/psp.png";
import logo from "../assets/logo.png";
import background from "../assets/vid.mp4";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Card from "./Card";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [guides, setGuides] = useState([]);
 

  useEffect(() => {
    const fetchGuides = async () => {
      const response = await fetch("http://localhost:3001/api/v1/guide/latestGuides");
      const data = await response.json();
      setGuides(data.sortedByLatestDate);
    };
    fetchGuides();
  }, []);

  

  console.log(guides)
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const toggleCategoryDropdown = () => setShowCategoryDropdown(!showCategoryDropdown);

  return (
    <div>
      <section className="relative h-[600px] overflow-hidden bg-white opacity-80">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={background}
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        <div className="relative z-10 flex items-center justify-between p-4 bg-white lg:h-[100px] flex-wrap">
          <img src={logo} alt="Logo" className="w-[120px] md:w-[150px]" />
          <nav className="flex gap-4 items-center flex-wrap">
            <button className="bg-white px-4 py-2 rounded-md text-sm md:text-base">
              About
            </button>
            <button className="bg-white px-4 py-2 rounded-md text-sm md:text-base">
              Guide
            </button>
            <div className="relative">
              <button
                className="bg-white px-4 py-2 rounded-md flex items-center text-sm md:text-base"
                onClick={toggleCategoryDropdown}
              >
                Categories <MdArrowDropDown className="ml-2" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md p-2 z-20">
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                    Technology
                  </a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                    Health
                  </a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                    Sport
                  </a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                    Business
                  </a>
                </div>
              )}
            </div>
          </nav>
          <Link to={"/login"}>
          
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm md:text-base">
            Login
          </button>
          </Link>
        </div>

        <div className="relative z-10 flex flex-wrap h-full px-4 lg:px-8">
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-32">
            <img
              src={bg7}
              alt="Left Image"
              className="w-full max-w-[600px] h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:p-10 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              Welcome to InfoSphere
            </h1>
            <p className="text-sm md:text-lg mb-6 text-gray-300">
              Stay updated with the latest blog posts, guides, and articles on
              various topics.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md w-full md:w-[200px]">
              Subscribe
            </button>
            <div className="flex mt-4 gap-4 justify-center lg:justify-start">
              <a href="https://facebook.com" className="text-blue-500">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" className="text-pink-500">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="text-blue-400">
                <FaXTwitter />
              </a>
            </div>

            <div className="flex mt-12 lg:mt-24 justify-center lg:justify-start">
              <img
                src={leftback}
                alt="Blog Preview"
                className="w-[70%] md:w-[50%] h-48 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* <h2 className="text-lg md:text-xl font-bold mb-6">Latest Guides</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-10">
          {guides.slice(0, 12).map((data) => (
           <div className="mb-40">
             <Card
              key={data._id}
              _id={data._id}
              image={data.media}
              title={data.title}
              content={data.content}
              Author={data.userId.username}
              day={data.createdAt.substring(8, 10)}
              month={months[parseInt(data.createdAt.substring(5, 7), 10) - 1]}
            />
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
