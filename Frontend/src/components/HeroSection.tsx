
import logo from "./assets/logo.png";
import backgroundImage from "./assets/background-2.png"; 

const HeroSection = () => {
    return (
        <section
            className="bg-cover bg-center h-[200px]" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Logo */}
            <img src={logo} className="w-64 h-32 absolute left-0 top-0 ml-20" alt="Logo" />

            {/* Navigation Bar */}
            <nav className="bg-gray-100 bg-opacity-70">
                <div className="flex items-center text-center ml-[800px] justify-between px-6 py-2">
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className="text-blue-500 hover:underline">Blogs</a>
                        </li>
                        <li>
                            <a href="/" className="text-blue-500 hover:underline">Trending</a>
                        </li>
                        <li>
                            <a href="/" className="text-blue-500 hover:underline">Latest</a>
                        </li>
                    </ul>
                    <div className="flex space-x-6 mt-2 mr-8">
                        <button className="bg-blue-600 rounded-2xl text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
                        <button className="bg-green-600 rounded-2xl text-white px-4 py-2 rounded hover:bg-green-600">Sign In</button>
                    </div>
                </div>
            </nav>
            <div className="text-3xl font-bold text-center p-4">
               <h1>
                  vc
               </h1>
            </div>
        </section>
    );
};

export default HeroSection;
