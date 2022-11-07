import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const TopBar = () => {
  const navigate = useNavigate();
  const { username } = useSelector((store) => store.user);
  const styles = {
    topBarStyles: {
      display: "flex",
      width: "100%",
      justifyContent: "flexEnd",
    },
  };
  return (
    <>
      <div className="top-bar-div">
        <h3
          className="top-bar-h3"
          style={styles.h3Style}
          onClick={() => navigate("/manage-hotel")}
        >
          Manage Your Hotels
        </h3>
      </div>
      <hr />
    </>
  );
};

export default TopBar;
