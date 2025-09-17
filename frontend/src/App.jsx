import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import Men from './components/Men.jsx'
import Women from './components/Women.jsx'
import Kids from './components/Kids.jsx'
import Shop from './components/Shop.jsx'
import Profile from './components/Profile.jsx'
export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
           <Route  path='/'  element={<Shop/>}/>
        <Route  path='/Men'  element={<Men/>}/>
            <Route  path='/Women'  element={<Women/> } />
                <Route  path='/Kids' element={<Kids/>}/>
                    <Route  path='/Shop'  element={<Shop/>}/>
                    <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}


// npm i react-redux redux react-router-dom react-icons 

// store , initialState, reducerfn , constants 