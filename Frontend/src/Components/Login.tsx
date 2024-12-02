import React, { useState } from 'react';
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';


interface LoginResponse {
   
    _id: string;
    username: string;
    email: string;
    role:string;
    password:string;
}

const Login: React.FC = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data: LoginResponse = await response.json(); 
            console.log(data)

            const { _id, username, email: userEmail, role: userRole ,password:PC} = data;
            // console.log(`${_id} ${username} ${userEmail} ${userRole}`);
            localStorage.setItem('userId', _id);
            localStorage.setItem('username', username); 
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('PC', PC);

            navigate("/Dashboard")
        } catch (error: any) {
            setMessage(error.message || 'Login failed');
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 opacity-80">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full relative">
                {/* <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">INFOSPHERE</h1> */}
                <div className="flex justify-center">
                    <img src={logo} className="h-32" />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Sign in
                    </button>
                </form>
                <div className="flex gap-2 py-4 justify-center">
                    <p>Don't have an account?</p>
                    <Link to={"/register"}><p className="text-green-600"> Sign up here</p></Link>
                </div>
                {message && <p className="text-center text-red-500 mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
