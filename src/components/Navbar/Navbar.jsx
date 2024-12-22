import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { IoNotifications } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import NavSearch from "../NavSearch/NavSearch";
import { UserImage } from "../../Pages/Profile/UserProfile/UserProfile";
import MediaSearch from "../MediaSearch/MediaSearch";
import SearchContent from "../SearchContent/SearchContent";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moreOptionsRef = useRef(null);

  const goHome = () => {
    navigate("/");
  };
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navCon">
        <div className="navbar-brand" onClick={goHome}>
          <NavLink to="/" className="logo">
            TrackItNow
          </NavLink>
        </div>
        <div className="nav-links">
          <ShowOnLogin>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/goals">Goals</NavLink>
            <NavLink to="/habits">Habits</NavLink>
            <NavLink to="/journal">Journal</NavLink>
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/user-profile" className="profileText">
              Profile
            </NavLink>
          </ShowOnLogin>
        </div>
      </div>
      <div className="nav-actions">
        <ShowOnLogin>
          <SearchContent />
          {/* <MediaSearch /> */}
          <NavLink to="/notifications" className="notificationBell">
            <IoNotifications />
          </NavLink>
        </ShowOnLogin>
        <ThemeToggle className="toggleThemes" />
        <ShowOnLogout>
          <NavLink to="/login" className="loginButton">
            Login
          </NavLink>
        </ShowOnLogout>
        <ShowOnLogin>
          <NavLink to="/user-profile" className="profileImg">
            <UserImage />
          </NavLink>
          <div
            ref={moreOptionsRef}
            className="more-options"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <IoMdMore className="icon" />
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="linksDivs">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/goals">Goals</NavLink>
                  <NavLink to="/habits">Habits</NavLink>
                  <NavLink to="/journal">Journal</NavLink>
                  <NavLink to="/community">Community</NavLink>
                  <NavLink to="/resources">Resources</NavLink>
                  <NavLink to="/user-profile">Profile</NavLink>
                </div>
                <div className="buttonDivs">
                  <button onClick={logoutUser}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </ShowOnLogin>
      </div>
    </nav>
  );
};

export default Navbar;
