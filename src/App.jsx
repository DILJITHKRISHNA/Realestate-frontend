import React from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserRoute from './Routes/User/UserRoute'
import HeaderNav from './Components/User/Header/HeaderNav'

function App() {
  return (
    <Router>
      <HeaderNav/>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
      </Routes>
    </Router>
  )
}

export default App
