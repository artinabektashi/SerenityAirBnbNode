/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import jwt_decode from "jwt-decode";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line no-unused-vars
  handleLogin: (token) => {},
  handleLogout: () => {},
});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    localStorage.setItem("userId", decodedUser.id);
    localStorage.setItem("userRole", decodedUser.role);
    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
