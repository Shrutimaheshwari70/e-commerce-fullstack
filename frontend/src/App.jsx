import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import Men from './components/Men.jsx'
import Women from './components/Women.jsx'
import Kids from './components/Kids.jsx'
import Shop from './components/Shop.jsx'
export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route  path='/Men'  element={<Men/>}/>
            <Route  path='/Women'  element={<Women/> } />
                <Route  path='/Kids' element={<Kids/>}/>
                    <Route  path='/Shop'  element={<Shop/>}/>
      </Routes>
    </div>
  )
}
