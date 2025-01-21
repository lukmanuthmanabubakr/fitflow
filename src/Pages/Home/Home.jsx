import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Home.css";
import Loader from "../../components/Loader/Loader";
import heroBg from "../../Assets/pexels-photo-3912468.jpeg"; // Impor

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title">Track Your Fitness Journey</h1>
            <p className="hero-subtitle">
              Stay motivated and achieve your fitness goals with ease. Monitor your progress, set goals, and celebrate every milestone.
            </p>
            <NavLink className="hero-btn" to="/">Get Started</NavLink>
          </div>
          <div className="hero-overlay"></div>
        </section>
      )}
    </>
  );
};

export default Home;
