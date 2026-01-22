import React from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate("/create-food");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div
          className="top-links"
          style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
        >
          <Link to="/user/login">Login as User</Link>
          <Link to="/food-partner/login">Login as Food Partner</Link>
        </div>
        <h2 className="title">Partner sign in</h2>
        <p className="subtitle">
          Access your dashboard to manage menus and orders.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="owner@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn">
              Sign in
            </button>
            <button type="button" className="btn secondary">
              Help
            </button>
          </div>

          <p className="small-note">
            Need to create an account? Register as a partner.
          </p>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
