import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";
export const register = (name: string, email: string, password: string) => {
  return axios.post(API_URL, {
    fullName: name,
    email,
    password,
    isAdmin: true,
  });
};
export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("login");
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};