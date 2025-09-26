import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function Login({ setLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' }); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Email and password are required ❌");
      return;
    }

    //  Password length check
    if (form.password.length <= 6) {
      toast.error("Invalid Password ❌");
      return;
    }

    try {
      await axios.post('/auth/login', form);
      setLoggedIn(true);
      toast.success('Login successful! 🎉');
      navigate('/dashboard'); 
    } catch (err) {
      toast.error('Invalid Email or Password ❌');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('loginn.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 shadow-lg w-full rounded-xl border max-w-sm ml-165">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

       
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
          onClick={handleLogin}
          className="btn w-full mt-4"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
