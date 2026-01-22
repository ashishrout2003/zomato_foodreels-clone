import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate }  from 'react-router-dom'

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partnerName = e.target.partnerName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const contactName = e.target.contactName.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register",{
      name: partnerName,
      email,
      password,
      contactName,
      phone,
      address
    },{
      withCredentials: true
    })
    console.log(response.data);
    navigate("/food-partner/login")
   
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="top-links" style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
          <Link to="/user/register">Register as User</Link>
          <Link to="/food-partner/register">Register as Food Partner</Link>
        </div>
        <h2 className="title">Partner sign up</h2>
        <p className="subtitle">Create an account to manage your restaurant and orders.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Partner name</label>
            <input name="partnerName" type="text" placeholder="Your restaurant" />
          </div>

          <div className="form-group">
            <label>Contact email</label>
            <input name="email" type="email" placeholder="owner@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" />
          </div>

          <div className="form-group">
            <label>Contact name</label>
            <input name="contactName" type="text" placeholder="Full name" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input name="address" type="text" placeholder="Restaurant address" />
          </div>

          <div className="form-group">
            <label>Phone no</label>
            <input name="phone" type="tel" placeholder="Phone number" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Create account</button>
            <button type="button" className="btn secondary">Cancel</button>
          </div>

          <p className="small-note">We'll review your application and contact you by email.</p>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
