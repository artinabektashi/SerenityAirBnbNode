import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="admin-container">
      <h2 className="heading">Welcome to Admin Panel</h2>
      <hr />
      <div className="buttons-container">
        <Link to={"/existing-rooms"} className="admin-button">
          Manage Rooms
        </Link>
        <Link to={"/existing-bookings"} className="admin-button">
          Manage Bookings
        </Link>
      </div>
    </section>
  );
};

export default Admin;
