import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav/TopNav'
import Home from './Pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Home />
    </BrowserRouter>
  )
}

export default App
