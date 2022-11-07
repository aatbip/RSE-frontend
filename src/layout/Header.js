import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((store) => store.user);

  const handleLoginLogout = () => {
    if (loggedIn) {
      dispatch(removeUser());
      navigate("/");
      toast("You're logged out!");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container-header">
      <div className="wrapper-header">
        <h1 onClick={() => navigate("/")}>HOTEL REVIEW & RECOMMENDATION</h1>
        <div className="content-header">
          <p onClick={() => handleLoginLogout()}>
            {loggedIn ? "Logout" : "Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
