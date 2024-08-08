"use client"
import styles from "./login.module.css"
import React from 'react'
import Link from "next/link"
import { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const showSignup = () => setIsLogin(false);
    const showLogin = () => setIsLogin(true);
  return (
    <div className={styles.container}>
    <div className={styles.formContainer}>
      <div className={styles.btnBox}>
        <button className={`${styles.btn} ${isLogin ? styles.active : ''}`} onClick={showLogin}>Sign In</button>
        <button className={`${styles.btn} ${!isLogin ? styles.active : ''}`} onClick={showSignup}>Sign Up</button>
      </div>
      <section className={`${styles.formSection} ${isLogin ? styles.show : styles.hide}`}>
        <div className={styles.formTitle}><span>Sign In</span></div>
        <div className={styles.formInputs}>
        <div className={styles.inputBox}>
            <input type="text" className={styles.inputField} placeholder="Nom de l'entreprise" required />
          </div>
          <div className={styles.inputBox}>
            <input type="text" className={styles.inputField} placeholder="User Name" required />
          </div>
          <div className={styles.inputBox}>
            <input type="password" className={styles.inputField} placeholder="Password" required />
          </div>
          <div className={styles.forgetPass}><a href="#">Forgot Password</a></div>
          <div className={styles.inputBox}>
            <button className={styles.inputSubmit}><span>Sign In</span></button>
          </div>
        </div>
      </section>
      <section className={`${styles.formSection} ${!isLogin ? styles.show : styles.hide}`}>
        <div className={styles.formTitle}><span>Sign Up</span></div>
        <div className={styles.formInputs}>
        <div className={styles.inputBox}>
            <input type="text" className={styles.inputField} placeholder="Nom de l'entreprise" required />
          </div>
          <div className={styles.inputBox}>
            <input type="text" className={styles.inputField} placeholder="User Name" required />
          </div>
          <div className={styles.inputBox}>
            <input type="email" className={styles.inputField} placeholder="Email" required />
          </div>
          <div className={styles.inputBox}>
            <input type="tel" className={styles.inputField} placeholder="Telephone" required />
          </div>
          <div className={styles.inputBox}>
            <input type="password" className={styles.inputField} placeholder="Password" required />
          </div>
          <div className={styles.inputBox}>
            <button className={styles.inputSubmit}><span>Sign Up</span></button>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
}

export default Login