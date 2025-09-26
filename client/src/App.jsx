import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login'; 
import Dashboard from './components/Dashboard'; 
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Prevent flicker

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/check', { withCredentials: true });
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path="/signup" element={<Signup />} />
         <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} />}  />
         

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/dashboard" element={<Dashboard setLoggedIn={setLoggedIn} />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
