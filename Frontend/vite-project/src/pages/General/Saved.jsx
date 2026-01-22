import React, { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  // fetch saved videos on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        // backend returns `SavedFood` array where each item has a populated `food`
        const saved = (response.data.SavedFood || response.data.SavedFoods || []).map((s) => {
          const f = s.food || s;
          return {
            _id: f._id,
            video: f.video,
            likeCount: f.likeCount ?? f.likes ?? 0,
            description: f.description,
            foodPartner: f.foodPartner,
            isBookmarked: true,
          };
        });
        setVideos(saved);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401) {
          window.location.href = "/user/login";
        }
        console.error("Failed to fetch saved videos", err);
      });
  }, []);

  // observe visible reel and auto-play/pause like Home
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const options = { root, threshold: 0.75 };
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

    const reels = root.querySelectorAll(".reel");
    reels.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, [videos]);

  // update list when home dispatches saved-updated event (live add/remove)
  useEffect(() => {
    function handler(e) {
      const { item, save } = e.detail || {};
      if (!item || !item._id) return;
      if (save) {
        setVideos((prev) => {
          if (prev.some((v) => v._id === item._id)) return prev;
          return [...prev, item];
        });
      } else {
        setVideos((prev) => prev.filter((v) => v._id !== item._id));
      }
    }

    window.addEventListener("saved-updated", handler);
    return () => window.removeEventListener("saved-updated", handler);
  }, []);

  const navigate = useNavigate();

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.Like) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount ?? 1) - 1, 0) } : v
          )
        );
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        navigate("/user/login");
        return;
      }
      console.error("Like failed", err);
    }
  }

  async function bookmarkVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save) {
        // marked saved — ensure flag
        setVideos((prev) => prev.map((v) => (v._id === item._id ? { ...v, isBookmarked: true } : v)));
        // notify others
        try {
          window.dispatchEvent(new CustomEvent("saved-updated", { detail: { item, save: true } }));
        } catch (e) {}
      } else {
        // unsaved: remove from saved list
        setVideos((prev) => prev.filter((v) => v._id !== item._id));
        try {
          window.dispatchEvent(new CustomEvent("saved-updated", { detail: { item, save: false } }));
        } catch (e) {}
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        navigate("/user/login");
        return;
      }
      console.error("Failed to toggle bookmark", err);
    }
  }

  return (
    <div className="reels-container" ref={containerRef} style={{ minHeight: "100vh" }}>
      {videos.length === 0 && (
        <div style={{ maxWidth: 720, margin: "18px auto", padding: 12 }}>
          <h2 style={{ margin: "6px 0", color: "var(--text)" }}>Saved</h2>
          <div style={{ color: "var(--muted)" }}>No saved videos yet.</div>
        </div>
      )}

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
            <Link className="visit-btn" to={"/food-partner/" + item.foodPartner}>
              Visit store
            </Link>
          </div>

          <div className="reel-actions">
            <button className="action action-btn" aria-label={`like-${item._id}`} onClick={() => likeVideo(item)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8 7.6c0 6.3-8 11.6-8 11.6s-8-5.3-8-11.6A5 5 0 0 1 9 2a5 5 0 0 1 4.8 5.6c0 .1 0 .4 0 .4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="action-label">likes : {item.likeCount ?? 0}</div>
            </button>

            <button className="action action-btn" aria-label={`save-${item._id}`} onClick={() => bookmarkVideo(item)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="action-label">Save : {item.isBookmarked ? "✓" : ""}</div>
            </button>

            <button className="action action-btn" aria-label={`comment-${item._id}`} onClick={() => console.log("comment", item._id)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="action-label">Comment</div>
            </button>
          </div>
        </div>
      ))}

      <BottomNav />
    </div>
  );
};

export default Saved;
