import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
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
    const res = await dispatch(login(credentials));
    if (res.type === "user/login/fulfilled") {
      navigate("/");
    }
  };
  return (
    <div className="container__login">
      <div className="wrapper__login">
        <h1>Login</h1>
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
          <Link to="/registration">REGISTER NOW!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
