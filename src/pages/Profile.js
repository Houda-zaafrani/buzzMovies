import React from "react";
import "./profile.css";
import profile from "../image/profile.png";
import { Link } from "react-router-dom";

const Profile = ({ isTogled, toggleButton }) => {
  return (
    <div
      className={`profile container-profile ${isTogled ? "dark-profile" : ""}`}
    >
      <form>
         <div className="image-profile">
        <img src={profile} alt="" />
      </div>
       <div className="title-profile">
        <h2>So, whats your plan for today ?</h2>
      </div>

      <div className="conatiner-link">
        <div className="buttons">
          <button className="pushable">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">
              <Link to="/login" className="link-profile">
                Login
              </Link>
            </span>
          </button>
        </div>

        <div>
          <button className="pushable">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">
              <Link to="/register" className="link-profile">
                Register
              </Link>
            </span>
          </button>
        </div>
      </div>
      </form>
     
     
    </div>
  );
};

export default Profile;
