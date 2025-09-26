import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });                     
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    } //testing empty form details

    
    if (form.password.length <= 6) {
      toast.error("Password must be greater than 6 characters");
      return;
    } // testing password > 6 only

    try {
      await axios.post('/auth/signup', form);
      toast.success("Signup successful!");
      navigate('/'); // go to login page
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('signup.png')" }} 
    >
      <div className="bg-white bg-opacity-90 p-8 shadow-lg w-full rounded-xl border max-w-sm ml-165">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Account</h2>

        
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mt-3"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="btn w-full mt-4"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
