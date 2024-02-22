import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faEye } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";

const Login = ({ isTogled }) => {
  const { errors: err, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    dispatch(signin(data));
  };
  useEffect(() => {
    if (isAuth) navigate("/home");
  }, [isAuth]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`login container-login ${isTogled ? "dark-login" : ""}`}>
      <form className="form-container-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title-login">Login</h1>

        <div>
          <div className="inputBox_login ">
            <div className="iconLabel">
              <FontAwesomeIcon icon={faAt} />
              <label>Email</label>
            </div>

            <div>
              <input
                className="email-input"
                type="email"
                placeholder="E-mail"
                {...register("email", { required: true })}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="inputBox_login pass-log">
            <div className="iconLabel iconlabel-pass">
              <FontAwesomeIcon icon={faKey} className="icons" />
              <label>Password</label>
            </div>

            <div className="password-login ">
              <div className="input_and_icon">
                <input
                  className="password-input-login"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className="eye_login"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
          </div>
          {(errors.email || errors.password) && (
            <Alert variant="danger" className="required-alert">
              Email or password required
            </Alert>
          )}

          {err === "Email does not exist, please try to register" && (
            <Alert variant="danger" className="required-alert">
              Email does not exist, please try to register
            </Alert>
          )}

          {err === "Invalid password" && (
            <Alert variant="danger" className="invalid-pass">
              Invalid password, please try again
            </Alert>
          )}

          <div className="Button">
            <input type="submit" value="Login" className="input-button " />
          </div>
        </div>
        <div className="link-signup">
          <span>New in to do list ? </span>
          <Link to="/register" className="link-to-register">
            Join us now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
