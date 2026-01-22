import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
   
   const response =  await axios.post("http://localhost:3000/api/auth/user/register",{
    fullName: name,
    email, 
    password
  },{
    withCredentials: true
  })
console.log(response.data);

navigate("/user/login")

    
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="top-links" style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
          <Link to="/user/register">Register as User</Link>
          <Link to="/food-partner/register">Register as Food Partner</Link>
        </div>
        <h2 className="title">Create your account</h2>
        <p className="subtitle">Sign up to discover great food and restaurants.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" placeholder="Full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Create account</button>
            <button type="button" className="btn secondary">Cancel</button>
          </div>

          <p className="small-note">By continuing you agree to the terms and privacy policy.</p>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
