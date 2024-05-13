import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import ThemeContextProvider from './context/ThemeContextProvider.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "video", 
        element: <div>Video Route</div>
      }

    ], 
    errorElement: <ErrorPage></ErrorPage>
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
