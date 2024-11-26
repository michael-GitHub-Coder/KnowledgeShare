import { FormEvent } from 'react';
import logo from '../assets/logo.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";





const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

const Footer = () => {
  return (
    <footer className="footer flex items-center justify-center bg-gray-100 text-black p-14  pb-4">
      <aside>
        <img 
          src={logo} 
          alt="" 
          className="w-40 h-40 bg-slate-400 "
        />
        <p className="font-bold text-2xl pb-2">
          INFOSPHERE Industries Ltd.
          <br />
          Where ideas connect, knowledge grows
        </p>
        <br />
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        <div className=" p-6 flex justify-start gap-8">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFacebook} className="text-2xl text-gray-400 hover:text-gray-800" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faTwitter} className="text-2xl text-gray-400 hover:text-gray-800" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faInstagram} className="text-2xl text-gray-400 hover:text-gray-800" />
  </a>
</div>
       
      </aside>
      <form className='items-end justify-end p-4' onSubmit={handleSubmit}>
      <h6 className="text-2xl font-bold text-black">Newsletter</h6>
      <fieldset className="form-control w-80">
        <label className="label">
          <span className="text-lg">Enter your email address</span>
        </label>
        <div className="join">
          <input
            type="email"
            placeholder="username@infos.com"
            className="input input-bordered join-item border rounded-md border-gray-400 p-4 "
            required
          />
          <button type="submit" className="text-white border rounded-md border-gray-400 p-4 join-item bg-slate-700 ">
            Subscribe
          </button>
        </div>
      </fieldset>
    </form>
   

    </footer>
  );
};

export default Footer;
