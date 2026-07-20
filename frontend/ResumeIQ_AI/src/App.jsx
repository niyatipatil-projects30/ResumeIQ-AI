import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {SignUp} from'./component/SignUp';
import {Login} from './component/Login';
import { Routes, Route } from "react-router-dom";
import {Home}from'./pages/Home';
import ProtectedRoute from './component/ProtectedRoute';
import {Dashboard} from'./pages/Dashboard';
import{Profile}from'./component/Profile';
import Analytics from './pages/Analytics'
import {UploadResume} from './pages/UploadResume';
import  {Analysis} from "./pages/Analysis";

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
     {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route path="/profile"element={<Profile/>}/>
<Route path="/analytics"element={<Analytics />}/>
<Route path="/uploadresume"element={<UploadResume />}/>
<Route path="/analysis"element={<Analysis />}/>


    </Routes>
    
    </>
  )
}

export default App
