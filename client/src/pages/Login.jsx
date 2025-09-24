import React, { useState } from 'react'
// import { Routes, Route } from 'react-router-dom';
import styles from './Login.module.css';
// import Register from './Register';
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      toast.success(res.data.message || 'Login Successfully');

      setData({ email: '', password: '' }); // Reset form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed')
    };
  };
  return (
    <div className={styles.container}>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLoginUser}>
        <label>Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder='Enter Email ...' />
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder='Enter Password ...' />
        <button type='submit'>Login</button>
        <p className={styles.signup}>
          Don't have an account ? <a href='/register'>Sign up</a>
        </p>
      </form>
    </div>
  )
}

export default Login
