import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Components/Card'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import Article from './Components/Article'
import HomePage from './pages/HomePage'
import ManageUser from './Components/ManageUser'
import ManageGuides from './Components/ManageGuides'
import PlatformStats from './Components/PlatformStats'
import Dash from './Components/Dash'
import Analytics from './Components/Analytics'
import AddEditGuide from './Components/AddEditGuide'
import Profile from './Components/Profile'
import ArticleInDash from './Components/ArticleInDash'
import DashHome from './pages/DashHome'



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="Dash" element={<Dash />} />
          <Route path="ManageUser" element={<ManageUser />} />
          <Route path="ManageGuides" element={<ManageGuides />} />
          <Route path="PlatformStats" element={<PlatformStats />} />
          <Route path="Analytics" element={<Analytics />}/>
          <Route path="AddEditGuides" element={<AddEditGuide />}/>
          <Route path="profile" element={<Profile />} />
          <Route path="ArticleInDash" element={<DashHome />}/>
          <Route path="ArtINDashReal/:_id" element={<ArticleInDash />} />
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/Article/:_id" element={<Article />}  />
      </>
    )
  );


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
   
  )

}

export default App
