// AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './signUp';
import Home from './Home';
import Navbar from './Navbar';
import ReportComponent from './ReportComponent';
import CreateTicket from './CreateTicket';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
       {/* <Route path="/" element={<Login/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/reports" element={<ReportComponent/>} />
        <Route path="/Tickets" element={<CreateTicket/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
