import React from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserRoute from './Routes/User/UserRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
      </Routes>
    </Router>
  )
}

export default App
