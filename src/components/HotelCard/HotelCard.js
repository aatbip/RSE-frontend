import React from "react";

import "./style.css";

const HotelCard = ({ name, images, location, price, description }) => {
  return (
    <div className="container__hotel-card">
      <div>
        <img
          style={{ width: "300px", maxHeight: "180px" }}
          src={`${process.env.REACT_APP_API_KEY}/hotels/${images[0]}`}
        />
      </div>

      <h3 className="title__hotel-card">{name}</h3>
      <p>
        <b>Location:</b> {location}
      </p>
      <p>
        <b>Price:</b> {price}
      </p>
      <p style={{ width: "95%", margin: "0 auto" }}>
        <b>Description:</b> {description}
      </p>
    </div>
  );
};

export default HotelCard;
