import React from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";

const RatingComment = ({ id }) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [allRatings, setAllRatings] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const postRating = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/rating/add", {
        hotel: id,
        rating,
        review,
      });

      toast("You have dropped your rating!");
    } catch (e) {
      console.log(e);
    }
  };

  const getHotelRatings = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(`/rating/${id}`);
      setAllRatings(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(true);
      console.log(e);
    }
  };

  React.useEffect(() => {
    getHotelRatings();
  }, []);

  return (
    <div className="rating-container">
      <div className="rating-wrapper">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <textarea
          onChange={(e) => setReview(e.target.value)}
          name="review"
          type="text"
          placeholder="Add You Review"
        />
        <button type="button" onClick={(e) => postRating(e)}>
          Publish!
        </button>
      </div>

      <div className="review-wrapper">
        {!isLoading &&
          allRatings.map((el) => {
            return (
              <div className="review-wrapper-box">
                <h5>User: {el.username}</h5>
                <p>Rating: {el.rating}</p>
                <p>{el.review}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RatingComment;
