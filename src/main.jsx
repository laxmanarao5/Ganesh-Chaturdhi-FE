import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home, Expenditure, Donations, Layout } from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/expenditure',
        element: <Expenditure />
      },
      {
        path: '/donations',
        element: <Donations />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
