import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faEye, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

import Alert from "react-bootstrap/Alert";

const Regiter = ({ isTogled }) => {
  const { errors: err } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleChangeRegister = () => {
    if (errors.email) {
      clearErrors("email");
    } else {
      clearErrors("password");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
     dispatch(signup(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`login container-register ${isTogled ? "dark-register" : ""}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form-container-login">
        <h1 className="title-login">Register</h1>

        <div>
          <div className="inputBox_login">
            <div className="iconLabel">
              <FontAwesomeIcon icon={faUser} />
              <label>Name</label>
            </div>

            <div>
              <input
                type="text"
                className="email-input"
                placeholder="Name"
                {...register("name", { required: true })}
                autoComplete="off"
                onChange={handleChangeRegister}
              />
            </div>
          </div>
          <div className="inputBox_login">
            <div className="input_and_login">
              <FontAwesomeIcon icon={faAt} className="icons" />
              <label>Email</label>
            </div>

            <div>
              <input
                className="email-input"
                type="email"
                placeholder="Exmple@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                onChange={handleChangeRegister}
              />
            </div>
          </div>
          <div className="inputBox_login pass-log">
            <div className="iconLabel iconlabel-pass">
              <FontAwesomeIcon icon={faKey} className="icons" />
              <label>Password</label>
            </div>

            <div className="password-login">
              <div className="input_and_icon">
                <input
                  className="password-input-login"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    // pattern: {
                    //   value:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
                    // },
                  })}
                  onChange={handleChangeRegister}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className=" eye_login"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
          </div>

          {errors.email && (
            <Alert variant="danger" className="required-alert">
              Email required
            </Alert>
          )}

          {err === "email exist, please try to login" && (
            <Alert variant="danger" className="required-alert">
              email exist, please try to login
            </Alert>
          )}
          {errors.password && (
            <Alert variant="danger" className="required-alert">
              Password is required
            </Alert>
          )}
          {handleChangeRegister &&
            err === "Password must be at least 8 characters long" && (
              <Alert variant="danger" className="required-alert">
                Password must be at least 8 characters long
              </Alert>
            )}

          <div className="Button">
            <input
              type="submit"
              value="Sign up"
              className=" input-button register-b"
            />
          </div>
        </div>

        <div className="link-signup">
          <span>Have already an account ? </span>
          <Link to="/login" className="link-to-register">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Regiter;
