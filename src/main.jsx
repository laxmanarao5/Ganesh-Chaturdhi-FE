import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Home, Expenditure, Donations, Layout, Login, Offerings, Others, Users } from './components/index.js';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

// Example authentication status
const isLoggedIn = true;

// setting current user as admin user
localStorage.setItem('userRole', 'Admin')

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Define routes */}
      <Route path="/" element={isLoggedIn ? <Layout /> : <Login />}>
        {/* Nested routes for authenticated users */}
        {isLoggedIn && (
          <>
            <Route index element={<Home />} />
            <Route path="expenditure" element={<Expenditure />} />
            <Route path="donations" element={<Donations />} />
            <Route path="offerings" element={<Offerings />} />
            <Route path="others" element={<Others />} />
            {localStorage.getItem('userRole') === 'Admin' && <Route path="users" element={<Users />} />}
          </>
        )}
        {/* Route for login if not authenticated */}
        {!isLoggedIn && <Route path="/" element={<Login />} />}
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
