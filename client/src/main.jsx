import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import toast, { Toaster } from 'react-hot-toast';
import  TaskContextProvider from './context/TaskContext'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskContextProvider>
      <App/>
      <Toaster />
    </TaskContextProvider>
  </React.StrictMode>,
)
