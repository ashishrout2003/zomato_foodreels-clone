import React, { useEffect, useRef } from "react";
import "./home.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../../components/BottomNav";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const options = { root: containerRef.current, threshold: 0.75 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target.querySelector("video");
        if (!vid) return;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, options);

    const reels = containerRef.current.querySelectorAll(".reel");
    reels.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401) {
          // Not authenticated — redirect to login
          navigate("/user/login");
          return;
        }
        console.error("Failed to fetch videos", err);
      });
  }, []);
 async function likeVideo(item) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.Like) {
      setVideos(prevVideos =>
        prevVideos.map(v =>
          v._id === item._id
            ? { ...v, likeCount: (v.likeCount ?? 0) + 1 }
            : v
        )
      );
    } else {
      setVideos(prevVideos =>
        prevVideos.map(v =>
          v._id === item._id
            ? { ...v, likeCount: Math.max((v.likeCount ?? 1) - 1, 0) }
            : v
        )
      );
    }
  } catch (err) {
    console.error("Like failed", err);
  }
}

async function bookmarkVideo(item){
  const response = await axios.post(
    "http://localhost:3000/api/food/save",
    { foodId: item._id },
    { withCredentials: true });

  if(response.data.save){
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v._id === item._id
          ? { ...v, isBookmarked: true }
          : v
      )
    );
    // notify other pages (Saved) that a video was saved
    try { window.dispatchEvent(new CustomEvent('saved-updated', { detail: { item, save: true } })); } catch (e) {}
  }else{
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v._id === item._id
          ? { ...v, isBookmarked: false }
          : v
      )
    );
    try { window.dispatchEvent(new CustomEvent('saved-updated', { detail: { item, save: false } })); } catch (e) {}
  }
}


  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <div className="reel" key={item._id}>
          <video
            ref={(el) => videoRefs.current.set(item._id, el)}
            src={item.video}
            className="reel-video"
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
          />

          <div className="reel-overlay">
            <p className="reel-desc">{item.description}</p>
            <Link
              className="visit-btn"
              to={"/food-partner/" + item.foodPartner}
            >
              Visit store
            </Link>
          </div>

          <div className="reel-actions">
            <button
              className="action action-btn"
              aria-label={`like-${item._id}`}
              onClick={() => likeVideo(item)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8 7.6c0 6.3-8 11.6-8 11.6s-8-5.3-8-11.6A5 5 0 0 1 9 2a5 5 0 0 1 4.8 5.6c0 .1 0 .4 0 .4z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="action-label">likes : {item.likeCount ?? item.likes ?? 0}</div>
            </button>

            <button
              className="action action-btn"
              aria-label={`save-${item._id}`}
              onClick={() => bookmarkVideo(item)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3h12v18l-6-4-6 4V3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="action-label">Save : {item.isBookmarked ? "✓" : ""}</div>
            </button>

            <button
              className="action action-btn"
              aria-label={`comment-${item._id}`}
              onClick={() => console.log("comment", item._id)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="action-label">Comment45</div>
            </button>
          </div>
        </div>
      ))}

      <BottomNav />
    </div>
  );
};

export default Home;

