import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Home, Expenditure, Donations, Layout, Login, Offerings, Others, Users, Reports } from './components/index.js';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

// setting current user as admin user
localStorage.setItem('userRole', 'Admin')

let isLoggedIn
// get logged in user token
let token = localStorage.getItem('access_token')
token ? isLoggedIn = true : isLoggedIn = false

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public route for login */}
      <Route path="/" element={<Login />} />

      {/* Protected route for the app, with Layout wrapping the inner routes */}
      <Route element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="expenditure" element={<Expenditure />} />
        <Route path="donations" element={<Donations />} />
        <Route path="offerings" element={<Offerings />} />
        <Route path="others" element={<Others />} />
        <Route path="reports" element={<Reports />} />
        {localStorage.getItem('userRole') === 'Admin' && (
          <Route path="users" element={<Users />} />
        )}
      </Route>
    </>
  )
);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
