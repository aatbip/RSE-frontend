import React from "react";
import axios from "axios";
import "../../axios/axios";
import { useSelector } from "react-redux";

import "./style.css";
import { toast } from "react-toastify";
import HotelCard from "../HotelCard/HotelCard";

const HotelManage = () => {
  const { token } = useSelector((store) => store.user);
  const [hotel, setHotel] = React.useState({
    name: "",
    price: "",
    description: "",
    location: "",
    images: [],
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [userHotels, setUserHotels] = React.useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setHotel((prev) => {
      return {
        ...prev,
        [name]: name === "images" ? e.target.files : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", hotel.name);
    formData.append("price", hotel.price);
    formData.append("description", hotel.description);
    formData.append("location", hotel.location);
    Object.values(hotel.images).forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(`/hotels/addhotel`, formData);
      toast("Hotel Uploaded!");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUserHotel = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("hotels/getuserhotels");
      setIsLoading(false);
      setUserHotels(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchUserHotel();
  }, []);

  return (
    <div className="container__hotel-manage">
      <div className="wrapper__hotel-manage">
        <div className="add-new-hotel">
          <h2>Upload Your Hotel</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              placeholder="Description"
              name="description"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="file"
              name="images"
              onChange={(e) => handleChange(e)}
              multiple={true}
            />
            <input id="button-hotel-manage" type="submit" value="Upload" />
          </form>
        </div>

        <div className="user-hotel-section">
          <h1>Your Hotels</h1>
          {!isLoading &&
            userHotels.map((hotel) => {
              return (
                <HotelCard
                  name={hotel.name}
                  images={hotel.images}
                  location={hotel.location}
                  price={hotel.price}
                  description={hotel.description}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HotelManage;
