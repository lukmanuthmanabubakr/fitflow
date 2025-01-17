import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login/Login";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import LoginWithCode from "./Pages/Auth/LoginWithCode/LoginWithCode";
import Verify from "./Pages/Auth/Verify/Verify";
import Profile from "./Pages/Profile/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          <Route path="/verify/:verificationToken" element={<Verify />} />
          {/* */}
          <Route path="/user-profile" element={<Profile />} />
        </Routes>
      </GoogleOAuthProvider>
      {/* <Loader /> */}
    </div>
  );
};

export default App;
