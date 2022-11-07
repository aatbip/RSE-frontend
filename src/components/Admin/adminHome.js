import React from "react";
import axios from "axios";
import "../../axios/axios";

const AdminHome = () => {
  const [allHotels, setAllHotels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAllHotel = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("hotels/gethotelsadmin");
      setAllHotels(res.data.data);
      console.log(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const verifyHotel = async (e, id) => {
    e.preventDefault();
    try {
      await axios.post("hotels/verify", {
        id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getAllHotel();
  }, []);

  console.log(allHotels);

  return (
    <div className="all-hotels">
      {!isLoading &&
        allHotels.map((el) => {
          return (
            <div className="hotel-list">
              <h3>{el.name}</h3>
              <p>{el.price}</p>
              <p>{el.location}</p>
              <p>{el.description}</p>
              <button onClick={(e) => verifyHotel(e, el._id)} type="button">
                Accept
              </button>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default AdminHome;
