import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider, Router, Navigate } from 'react-router-dom';
import Market from './pages/Market/Market';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/market',
        element: <Market />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/',
        element: <Navigate to='/market' replace />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
