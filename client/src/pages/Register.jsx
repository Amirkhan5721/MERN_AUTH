import React, { useState } from 'react'
import styles from './Register.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success(res.data.message || 'Registration Successfully.')

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed.')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Register Your Account</h2>
      <form onSubmit={handleRegisterUser}>
        <label>Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder='Enter Name ...' />
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
