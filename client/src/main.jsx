import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import NotFound from './components/NotFound.jsx'
import Dashboard from './components/Dashboard.jsx'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import './index.css'
import AddShelter from './components/AddShelter.jsx'
import ShelterLogin from './components/ShelterLogin.jsx'
import ShelterDashboard from './components/ShelterDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>,
    errorElement: <NotFound />
  },
  {
    path: '/signup',
    element: <Layout><SignUp /></Layout>
  },
  {
    path: '/signin',
    element: <Layout><SignIn /></Layout>
  },
  {
    path: '/dashboard',
    element: <AdminLayout><Dashboard /></AdminLayout>
  },
  {
    path:'/addshelter',
    element: <AddShelter />
  },
  {
    path:'/shelterlogin',
    element: <Layout><ShelterLogin /></Layout>
  },
  {
    path:'/shelterdashboard',
    element: <AdminLayout><ShelterDashboard /></AdminLayout>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)
