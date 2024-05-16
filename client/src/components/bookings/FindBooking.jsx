/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import moment from "moment";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  });

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  };
  const [isDeleted, setIsDeleted] = useState(false);

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }

    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="booking-contrainer container d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />

            <button type="submit" className="btn btn-hotel input-group-text">
              Find booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Finding your booking...</div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking Information</h3>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Confirmation Code:</th>
                  <td>{bookingInfo.bookingConfirmationCode}</td>
                </tr>
                <tr>
                  <th scope="row">Room Number:</th>
                  <td>{bookingInfo.room.id}</td>
                </tr>
                <tr>
                  <th scope="row">Room Type:</th>
                  <td>{bookingInfo.room.roomType}</td>
                </tr>
                <tr>
                  <th scope="row">Check-in Date:</th>
                  <td>
                    {moment(bookingInfo.checkInDate)
                      .subtract(1, "month")
                      .format("MMM Do, YYYY")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Check-out Date:</th>
                  <td>
                    {moment(bookingInfo.checkOutDate)
                      .subtract(1, "month")
                      .format("MMM Do, YYYY")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Full Name:</th>
                  <td>{bookingInfo.guestName}</td>
                </tr>
                <tr>
                  <th scope="row">Email Address:</th>
                  <td>{bookingInfo.guestEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Adults:</th>
                  <td>{bookingInfo.numOfAdults}</td>
                </tr>
                <tr>
                  <th scope="row">Children:</th>
                  <td>{bookingInfo.numOfChildren}</td>
                </tr>
                <tr>
                  <th scope="row">Total Guests:</th>
                  <td>{bookingInfo.totalNumOfGuests}</td>
                </tr>
              </tbody>
            </table>

            {!isDeleted && (
              <button
                onClick={() => handleBookingCancellation(bookingInfo.id)}
                className="btn btn-danger"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
