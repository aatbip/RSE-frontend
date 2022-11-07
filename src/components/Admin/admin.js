import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../axios/axios";
import { toast } from "react-toastify";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await axios.post("auth/admin/signin", {
      username: credentials.username,
      password: credentials.password,
    });
    toast(res.data.data.message);

    navigate("/admin-home");
  };
  return (
    <div className="container__login">
      <div className="wrapper__login">
        <h1>Welcome, Admin!</h1>
        <div className="content__login">
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
          <button onClick={(e) => handleLogin(e)} type="button">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
