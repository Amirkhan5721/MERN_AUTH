import React from 'react'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Our Project</h1>
      <p>This is a MERN Stack Project with Login, Register and Home pages.</p>
      <button className={styles.btn}> <a href="/register">Get Started</a></button>

    </div>
  )
}

export default Home
