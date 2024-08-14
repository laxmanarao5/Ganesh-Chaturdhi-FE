import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Home, Expenditure, Donations, Layout, Login } from './components/index.js';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

// Example authentication status
const isLoggedIn = true;

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
