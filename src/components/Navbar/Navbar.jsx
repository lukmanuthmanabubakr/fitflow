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
import { AiOutlineMenuFold } from "react-icons/ai";
import SearchContent from "../SearchContent/SearchContent";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moreOptionsRef = useRef(null);

  const goHome = () => {
    navigate("/");
  };
  const logoutUser = async () =>  {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login")
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
            GreenWood
          </NavLink>
        </div>
      </div>
      <div className="nav-actions">
        {/* <ThemeToggle className="toggleThemes" /> */}
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
          <AiOutlineMenuFold className="icon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="linksDivs">
                <ShowOnLogin>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/user-profile">Profile</NavLink>
                </ShowOnLogin>
              </div>
              <ShowOnLogout>
                <div className="buttonDivs">
                  <NavLink to="/login">Login</NavLink>
                </div>
              </ShowOnLogout>
              <ShowOnLogin>
                <div className="buttonDivs">
                  <button onClick={logoutUser}>Logout</button>
                </div>
              </ShowOnLogin>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
