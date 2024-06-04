import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login_check', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);

      const decoded = jwt_decode(token);
      console.log(decoded);

      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <form className='loginForm' onSubmit={handleSubmit}>
      <label className='loginEmailLabel' htmlFor="email">Email</label>
      <input
        className='loginEmailField'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <label className='loginPasswordLabel' htmlFor="password">Password</label>
      <input
        className='loginPasswordField'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button loginSubmitButton type="submit">Login</button>
    </form>
  );
}
