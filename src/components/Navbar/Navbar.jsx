import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ThemeToggle from "./ThemeToggle";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { TbMenuDeep } from "react-icons/tb";

import NavSearch from "../NavSearch/NavSearch";
import { UserImage } from "../../Pages/Profile/UserProfile/UserProfile";
import MediaSearch from "../MediaSearch/MediaSearch";


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
            FitFlow
          </NavLink>
        </div>
      </div>
      <div className="nav-links">
        <ShowOnLogin>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </ShowOnLogin>
        <NavLink to="/goals">About</NavLink>
        <NavLink to="/resources">Contact Us</NavLink>
        <NavLink to="/user-profile" className="profileText">
          Profile
        </NavLink>
      </div>
      <div className="nav-actions">
        <ShowOnLogout>
          <NavLink to="/login" className="loginButton">
            Login
          </NavLink>
        </ShowOnLogout>
        <ShowOnLogin>
          <NavLink to="/user-profile" className="profileImg">
            <UserImage />
          </NavLink>
        </ShowOnLogin>

        <div
          ref={moreOptionsRef}
          className="more-options"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <TbMenuDeep className="icon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="linksDivs">
                <ShowOnLogin>
                  <NavLink to="/dashboard">Dashboard</NavLink>{" "}
                </ShowOnLogin>
                <NavLink to="/goals">About</NavLink>
                <NavLink to="/resources">Contact Us</NavLink>
                <ShowOnLogin>
                  <NavLink to="/user-profile">Profile</NavLink>{" "}
                </ShowOnLogin>
              </div>
              <div className="buttonDivs">
                <button onClick={logoutUser}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
