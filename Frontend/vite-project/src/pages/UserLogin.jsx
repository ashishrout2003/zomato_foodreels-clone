import React from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);

    navigate("/");
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
        <h2 className="title">Welcome back</h2>
        <p className="subtitle">
          Log in to continue and enjoy personalized recommendations.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" />
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
              Forgot?
            </button>
          </div>

          <p className="small-note">
            Don't have an account? Register as a user.
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
