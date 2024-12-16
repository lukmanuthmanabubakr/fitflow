import React, { useEffect, useState } from "react";
import "./Home.css";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  // State to handle loading animation
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          
        </>
      )}
    </>
  );
};

export default Home;
