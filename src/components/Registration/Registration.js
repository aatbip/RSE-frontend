import React from "react";
// import axios from "axios";
// import "../../axios/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signup } from "../../redux/user/userSlice";

import "./style.css";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = React.useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegistration = async () => {
    let res = await dispatch(signup(credentials));
    if (res.type === "user/signup/fulfilled") navigate("/login");
  };

  return (
    <div className="container__registration">
      <div className="wrapper__registration">
        <h1>Registration</h1>
        <div className="content__registration">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="button" onClick={() => handleRegistration()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
