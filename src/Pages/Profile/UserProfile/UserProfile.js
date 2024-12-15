import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./UserProfile.css";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../../redux/features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import Notification from "../../../components/Notification/Notification";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const UserProfile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified ?? null, // Use null for initial loading state
  };
  

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageClick = () => {
    // Trigger the file input click when the image is clicked
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpmhsknxz/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }
      // Save profile to MongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser(userData));
      toast.success("Image Uploaded");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <>
    {!isLoading && profile.isVerified === false && <Notification />}
    <div className="userProfile-container">
        <h2 className="profile-header">User Profile</h2>
        {user && (
          <div className="profile-card">
            <div className="profile-left">
              <img
                src={imagePreview === null ? user?.photo : imagePreview}
                alt="Profileimg"
                onClick={handleImageClick}
                className="profile-image"
                style={{ cursor: "pointer" }}
              />

              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <NameOfUser />
              <p className="profile-role">Role: {profile.role}</p>
            </div>

            <form onSubmit={saveProfile} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile?.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile?.bio}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>
              <ButtonLoader
                className="save-button"
                type="submit"
                isLoading={isLoading}
              >
                Update Profile
              </ButtonLoader>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export const NameOfUser = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return <p className="nameOfUserProfle">{shortenText(username, 10)}</p>;
};

export const UserImage = () => {
  const user = useSelector(selectUser);
  const userImg = user?.photo || "default-image-url"; // Provide a default image URL or path if necessary
  return <img src={userImg} alt="User" className="user-image-profile" />;
};

export default UserProfile;


