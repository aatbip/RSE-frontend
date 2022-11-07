import React from "react";
import TopBar from "../TopBar/TopBar";
import { useSelector } from "react-redux";
import axios from "axios";
import HotelCard from "../HotelCard/HotelCard";
import { useNavigate } from "react-router-dom";
import RecommendedProduct from "../RecommendedProduct/RecommendedProduct";

const Homepage = () => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((store) => store.user);

  const [allHotels, setAllHotels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAllHotel = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("hotels/getallhotels");
      setAllHotels(res.data.data);
      console.log(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const getHotelDetailPage = (id) => {
    navigate(`hotel-detail/${id}`);
  };

  const addRecommendation = async (location, price) => {
    if (loggedIn) {
      try {
        await axios.post("recommendation/add", {
          location: location,
          price: price,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };

  React.useEffect(() => {
    getAllHotel();
  }, []);
  return (
    <>
      {loggedIn && <TopBar />}
      {loggedIn && <RecommendedProduct />}

      <div
        style={{
          textAlign: "center",
          width: "85%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "0em 0em 10em 0em",
        }}
      >
        {!isLoading ? (
          allHotels.map((hotel) => {
            return (
              <div
                onClick={() => {
                  getHotelDetailPage(hotel._id);
                  addRecommendation(hotel.location, hotel.price);
                }}
              >
                <HotelCard
                  name={hotel.name}
                  images={hotel.images}
                  location={hotel.location}
                  price={hotel.price}
                  description={hotel.description}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Homepage;
