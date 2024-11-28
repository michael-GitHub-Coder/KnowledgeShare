import { FormEvent } from "react";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/pexels-pixabay-267389.jpg"; // Ensure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Form submitted");
};

const Footer = () => {
  return (
    <footer
      className="footer flex items-center justify-between bg-white opacity-90 text-white p-14 pb-4 mt-[400px] h-[300px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed',
      }}
    >
      <aside className="flex flex-col items-center mx-auto bg-black p-4 opacity-60 rounded-2xl">
      
        <p className="font-bold text-2xl pb-2 text-center text-white">
          Infosphere Industries Ltd.
          <br />
          Where ideas connect, knowledge grows
        </p>
        <br />
        <p className="text-center">
          Copyright Â© {new Date().getFullYear()} - All rights reserved
        </p>
        <div className="p-6 flex justify-center gap-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl text-gray-400 hover:text-gray-800"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-2xl text-gray-400 hover:text-gray-800"
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl text-gray-400 hover:text-gray-800"
            />
          </a>
        </div>
      </aside>

      <div className="flex items-start">
        <form className="flex flex-col items-end" onSubmit={handleSubmit}>
          <h6 className="text-2xl font-bold text-black mb-2 text-white">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="text-lg">Enter your email address</span>
            </label>
            <div className="join flex gap-4">
              <input
                type="email"
                placeholder="username@infos.com"
                className="input input-bordered join-item border rounded-md border-gray-400 px-4 py-2"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
