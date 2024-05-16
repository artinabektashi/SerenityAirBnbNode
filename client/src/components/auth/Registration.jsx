import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(
        `User registered successfully with email: ${result.user.email}`
      );
      setErrorMessage("");
      setRegistration({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="login-container">
      {errorMessage && (
        <div>
          <p className="alert alert-danger">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div>
          <p className="alert alert-success">{successMessage}</p>
        </div>
      )}

      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            className="form-control"
            value={registration.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            className="form-control"
            value={registration.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={registration.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={registration.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
          >
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account?{" "}
            <Link className="register-link" to={"/login"}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Registration;
