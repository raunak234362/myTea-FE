/* eslint-disable no-unused-vars */
import api from "./api";

class AuthService {
  static async login(data) {
    console.log("Login attempt with username:", data.email);
    console.log("Login attempt with username:", data.password);
    try {
      const response = await api.post(`/api/auth/login/`, data,
         {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login response:", response);
      if (response.status === 400) {
        throw new Error("Invalid Credentials");
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Invalid Credentials");
      } else {
        console.error("Error in login:", error);
        throw new Error("Could not connect to server");
      }
    }
  }

  // Fetch logout
  static async logout(token) {
    try {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userType");
      console.log("User successfully logged out");
    } catch (error) {
      console.log("Error during logout:", error);
      throw error;
    }
  }
}
export default AuthService;
