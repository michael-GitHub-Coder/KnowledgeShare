import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Card from './Components/Card'
// import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'

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


  return (
    <>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <div className="flex justify-center gap-8">
        {  data.map(data=>( 
            <Card image={data.image} title={data.title} content={data.content}/>
          ))  
        }
      </div> */}
      <Dashboard />
    </>
   
  )

}

export default App
