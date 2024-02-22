import "./NavB.css";

import { Link, useLocation, useNavigate } from "react-router-dom";

import "./NavB.css";
import { useDispatch, useSelector } from "react-redux";
import { log_out } from "../../../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Toglle from "../toglle/Toglle";
import logo from "../../../image/logo.png";
import { useEffect } from "react";

const Navbarr = ({ isTogled, toggleButton }) => {
  const { isAuth } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
      dispatch(log_out());
      navigate("/");
  };
  useEffect(() => {
    if (!isAuth){
       navigate("/")
    }else{
      navigate("/home")
    }
  }, [isAuth]);

  return (
    <div className={`nav_bar container-nav ${isTogled ? "dark-nav" : ""}`}>
      <div className="left-side">
        <div>
          <img src={logo} alt="" className="logo-nav" />
        </div>
        <div>
          <Toglle
            isTogled={isTogled}
            toggleButton={toggleButton}
            className="toglle-navbar"
          />
        </div>
      </div>

      <div className="right-side">
        <div className="not-res-menu">
          {isAuth ? (
            <div className="nav-auth">
              <Link
                to="/home"
                className={`link-nav-auth ${
                  location.pathname === "/home" ? "current-page" : ""
                }`}
              >
                home
              </Link>
              
              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={handleLogout}
                className="logout"
              />
            </div>
          ) : (
            <div className="nav-notAuth">
              <Link
                to="/"
                className={`link-nav-notAuth ${
                  location.pathname === "/" ? "current-page" : ""
                }`}
              >
                Profile
              </Link>

              <Link
                to="/login"
                className={`link-nav-notAuth ${
                  location.pathname === "/login" ? "current-page" : ""
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`link-nav-notAuth ${
                  location.pathname === "/register" ? "current-page" : ""
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* responcive   */}
        <div className="container-menu">
          <div className="selected">
            <FontAwesomeIcon icon={faBars} className="menu-icon" />
            <span>Menu</span>
          </div>

          {isAuth ? (
            <div className="dropdown">
              <Link
                to="/home"
                className={`res-link-nav-auth ${
                  location.pathname === "/home" ? "current-page" : ""
                }`}
              >
                home
              </Link>

              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={handleLogout}
                className="logout"
              />
            </div>
          ) : (
            <div className="dropdown">
              <Link
                to="/"
                className={`res-link-nav-notAuth ${
                  location.pathname === "/" ? "current-page" : ""
                }`}
              >
                Profile
              </Link>

              <Link
                to="/login"
                className={`res-link-nav-notAuth ${
                  location.pathname === "/login" ? "current-page" : ""
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`res-link-nav-notAuth ${
                  location.pathname === "/register" ? "current-page" : ""
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbarr;
