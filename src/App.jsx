import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserRoute from './Routes/User/UserRoute';
import OwnerRoute from './Routes/Owner/OwnerRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoute />} />
        <Route path='/owner/*' element={<OwnerRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
