import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import ReportComponent from "./components/ReportComponent";
import Contact from "./components/Contact";
import Login from "./components/Login";
import "./App.css";
import SignUp from "./components/signUp";
import CreateTicket from "./components/CreateTicket";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import TicketsTable from "./components/TicketsTable";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthContent />
      </Router>
    </AuthProvider>
  );
};

const AuthContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {isAuthenticated && <Navbar />}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <Routes>
            {!isAuthenticated && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )}
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/report" element={<ProtectedRoute element={<ReportComponent />} />} />
            <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
            <Route path="/createTicket" element={<ProtectedRoute element={<CreateTicket />} />} />
            <Route path="/contactUs" element={<ProtectedRoute element={<ContactUs />} />} />
            <Route path="/FAQ" element={<ProtectedRoute element={<FAQ />} />} />        
            <Route path="/ticket" element={<ProtectedRoute element={<TicketsTable />} />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
