import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar.jsx'

import Profile from './components/Profile.jsx'
import Shop from './components/Shop.jsx'
import AdminPanel from "./components/AdminPanel";
import ContextProvider from "./Context/contextProvider.jsx";
import ShopCtaegory from "./components/ShopCtaegory.jsx";




export default function App(){
    return (
        <>
        <Navbar/>
             <ContextProvider>
        <Routes>
            <Route path="/" element={<Shop/>}/>
         
            <Route path="/Shop" element={<Shop/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
       

      <Route path="/shop/:category" element={<ShopCtaegory/>}/>
           
        </Routes>
         </ContextProvider>
        </>
    )

}