/* eslint-disable no-useless-catch */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const token = localStorage.getItem("token");

/* This function adds a new room to the database */
export async function addRoom(photo, room_type, room_price) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("room_type", room_type);
  formData.append("room_price", room_price);

  const response = await api.post("/rooms/add/new-room", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

/* This function gets all room types from database */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong with fetching room types!");
  }
}

/*This function gets all the rooms from db*/
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Something went wrong while fetching all rooms!");
  }
}

/*This function deletes a room from db*/
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("room_type", roomData.room_type);
  formData.append("room_price", roomData.room_price);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
/* This function gets one room from db */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`There was a problem while fetching room ${error.message}`);
  }
}

/* This function books a room */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error("Something went wrong while booking the room!");
    }
  }
}

/* This function gets all bookings from db */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings", {});
    return result.data;
  } catch (e) {
    throw new Error(
      `Something went wrong while fetching bookings! ${e.message}`
    );
  }
}

/* This function gets booking by confirmation code from db */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error(
        "Something went wrong while getting booking by confirmation code!"
      );
    }
  }
}

/* This function cancels or deletes a booking by bookingid from db */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(
      `Something went wrong while canceling the booking! ${error.message}`
    );
  }
}

/*This function gets all available rooms*/
export async function getAvailableRooms(checkInDate, checkOutDate, room_type) {
  const result = await api.get(
    `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&room_type=${room_type}`
  );
  return result;
}

export async function registerUser(registration) {
  try {
    const response = await api.post(`auth/register-user`, registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getUser(userId) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBookingsByUserId(userId) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}
