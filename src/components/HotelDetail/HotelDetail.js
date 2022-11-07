import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";

import "./style.css";
import RatingComment from "../RatingAndComment/RatingComment";

const HotelDetail = () => {
  const { id } = useParams();
  const { loggedIn } = useSelector((store) => store.user);

  const [hotel, setHotel] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const getHotelById = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(`/hotels/${id}`);
      setHotel(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  React.useEffect(() => {
    getHotelById();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <div className="container__hotel-detail">
        <div className="wrapper__hotel-detail">
          <>
            <div>
              {!isLoading ? (
                <Carousel>
                  {hotel.images.map((image) => {
                    return (
                      <div>
                        <img
                          src={`${process.env.REACT_APP_API_KEY}/hotels/${image}`}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <></>
              )}
              <h1>{hotel.name}</h1>
              <h3>{hotel.location}</h3>
              <h4>{hotel.price}</h4>
              <p>{hotel.description}</p>
            </div>
          </>
        </div>
      </div>
      {loggedIn ? (
        <div className="rating-review-section">
          <h1>ADD YOUR RATING</h1>
          <RatingComment key={id} id={id} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HotelDetail;
