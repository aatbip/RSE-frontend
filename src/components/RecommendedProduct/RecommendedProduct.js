import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

const RecommendedProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hotelByLocation, setHotelByLocation] = React.useState({});
  const [hotelByPrice, setHotelByPrice] = React.useState({});

  const getRecommendedByLocation = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get("/recommendation/location");
      setHotelByLocation(res.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getRecommendedByPrice = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get("/recommendation/price");
      setHotelByPrice(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const getHotelDetailPage = (id) => {
    navigate(`hotel-detail/${id}`);
  };

  React.useEffect(() => {
    getRecommendedByLocation();
    getRecommendedByPrice();
  }, []);

  return (
    <>
      <div className="container__location-recommend">
        <div className="wrapper__location-recommend">
          <h3>Recommended for you by Location</h3>
          <div className="content__location-recommend">
            {hotelByLocation.length >= 0 ? (
              hotelByLocation.map((hotel) => {
                return (
                  <div
                    className="content-wrapper__location-recommend"
                    onClick={() => getHotelDetailPage(hotel._id)}
                  >
                    <div>
                      <img
                        src={`${process.env.REACT_APP_API_KEY}/hotels/${hotel.images[0]}`}
                        alt="hotel image"
                      />
                    </div>
                    <div>
                      <p>{hotel.name}</p>
                      <p>{hotel.price}</p>
                      <p>{hotel.location}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Start surfing to get recommendations!</p>
            )}
          </div>
        </div>
      </div>

      <div className="container__location-recommend">
        <div className="wrapper__location-recommend">
          <h3>Recommended for you by Price</h3>
          <div className="content__location-recommend">
            {hotelByPrice.length >= 0 ? (
              hotelByPrice.map((hotel) => {
                return (
                  <div
                    className="content-wrapper__location-recommend"
                    onClick={() => getHotelDetailPage(hotel._id)}
                  >
                    <div>
                      <img
                        src={`${process.env.REACT_APP_API_KEY}/hotels/${hotel.images[0]}`}
                        alt="hotel image"
                      />
                    </div>
                    <div>
                      <p>{hotel.name}</p>
                      <p>{hotel.price}</p>
                      <p>{hotel.location}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Start surfing to get recommendations!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedProduct;
