import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
} from "react-icons/fa";

import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({});

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row mt-4">
          <div className="col-md-6 mb-5">
            {isLoading ? (
              <p>Loading room information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={roomInfo.photo}
                  alt="Room photo"
                  style={{ width: "100%", maxHeight: "500px" }}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 mb-5">
            {isLoading ? (
              <p>Loading room information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <table
                  className="table table-bordered"
                  style={{ marginTop: "4rem" }}
                >
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.room_type}</td>
                    </tr>
                    <tr>
                      <th>Price per night:</th>
                      <td>${roomInfo.room_price}</td>
                    </tr>
                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi /> Wifi
                          </li>
                          <li>
                            <FaTv /> Netflix Premium
                          </li>
                          <li>
                            <FaUtensils /> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt /> Mini bar refreshment
                          </li>
                          <li>
                            <FaCar /> Car Service
                          </li>
                          <li>
                            <FaParking /> Parking Space
                          </li>
                          <li>
                            <FaTshirt /> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-md-12">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};
export default Checkout;
