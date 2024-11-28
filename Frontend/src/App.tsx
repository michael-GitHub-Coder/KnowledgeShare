import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Card from './Components/Card'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import ManageUser from './Components/ManageUser'
import ManageGuides from './Components/ManageGuides'
import PlatformStats from './Components/PlatformStats'
import Dash from './Components/Dash'
import Analytics from './Components/Analytics'
import AddEditGuide from './Components/AddEditGuide'
import Profile from './Components/Profile'



const App = () => {
  const data = [
    {
      "image": "https://4kwallpapers.com/images/wallpapers/bugatti-w16-mistral-sports-cars-ultimate-roadster-2024-4500x3000-9103.jpeg",
      "title": "The Ultimate Guide to React",
      "content": "Learn the fundamentals of React and how to build dynamic web applications using this popular JavaScript library."
    },
    {
      "image": "https://4kwallpapers.com/images/wallpapers/bugatti-w16-mistral-sports-cars-ultimate-roadster-2024-4500x3000-9103.jpeg",
      "title": "Mastering JavaScript ES6",
      "content": "Dive deep into the new features of JavaScript ES6 and how they improve the development process."
    },
    {
      "image": "https://4kwallpapers.com/images/wallpapers/bugatti-w16-mistral-sports-cars-ultimate-roadster-2024-4500x3000-9103.jpeg",
      "title": "Understanding TypeScript",
      "content": "A comprehensive guide to TypeScript, offering better code quality and development experience with its type system."
    }
  ];
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route index element={<h3>Dashboard Home</h3>} /> 
          <Route path="ManageUser" element={<ManageUser />} />
          <Route path="ManageGuides" element={<ManageGuides />} />
          <Route path="PlatformStats" element={<PlatformStats />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </>
    )
  );

}

     
   


export default App
