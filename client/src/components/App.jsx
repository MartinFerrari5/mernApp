import React from 'react'
import CreateTask from './CreateTask'
import {NotFound} from './NotFound'

import {BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Tasks from './Tasks'
const router = createBrowserRouter([{
  path: "/",
  element: <Tasks />
  },
  {
    path: "/tasks",
    element: <CreateTask />
  },
  {
    path: "/tasks/:id",
    element: <CreateTask />
  },
  {
    path: "*",
    element: <NotFound />
  }
])
function App() {
  return (
  
   <main className='bg-gray-950 h-screen flex '>
  
    <RouterProvider router={router} />
   
   </main>
  
  )
}

export default App
