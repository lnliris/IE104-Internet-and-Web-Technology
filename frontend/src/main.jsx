import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import React from 'react';

createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  //  <React.StrictMode>
  <>
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
  </>    
  //  </React.StrictMode>
=======
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      
  // </React.StrictMode>
>>>>>>> main
)
