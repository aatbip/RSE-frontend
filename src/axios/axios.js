import axios from "axios";

//LOCAL
axios.defaults.baseURL = `${process.env.REACT_APP_API_KEY}/api`;

//SERVER
// axios.defaults.baseURL = "https://nat-dev-server.herokuapp.com/api";

axios.interceptors.request.use(function (req) {
  const token = localStorage.getItem("token");

  if (token) {
    const token = JSON.parse(localStorage.getItem("token"));
    req.headers.authorization = `Bearer ${token}`;
    return req;
  }
  return req;
});
