import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
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
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
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
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            value={registration.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-control"
            value={registration.lastName}
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
