import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from './splash/splash.jsx'
import Page1 from './splash/page1.jsx'
import Page2 from './splash/page2.jsx'
import Page3 from './splash/page3.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
