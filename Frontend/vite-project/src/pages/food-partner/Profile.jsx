import React from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="fp-page">
      <div className="fp-card">
        <div className="fp-header">
          <div className="fp-avatar">
            <img className="fp-avatar" src="https://plus.unsplash.com/premium_photo-1738776254709-a8872157f87d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""></img>
          </div>
          <div className="fp-header-right">
            <div className="fp-pill">Food Partner Name</div>
            <div className="fp-pill">{profile?.name}</div>
            <div className="fp-pill small">Address</div>
            <div className="fp-pill small">{profile?.address}</div>
          </div>
        </div>

        <div className="fp-stats">
          <div className="fp-stat">
            <div className="fp-stat-label">Total Meals</div>
            <div className="fp-stat-value">{profile?.totalMeals}</div>
          </div>
          <div className="fp-stat">
            <div className="fp-stat-label">Total Customer</div>
            <div className="fp-stat-value">{profile?.totalCustomers}</div>
          </div>
        </div>

        <hr className="fp-sep" />

        <div className="fp-grid">
          {videos.map((v) => (
            <div className="fp-tile" key={v.id}>

                <video 
                className="fp-tile-inner"
                style={{objectFit:"cover", width:'100%', height:'100%'}}
                src={v.video} muted ></video>
              {/* <div className="fp-tile-inner">Video</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
