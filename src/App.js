import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { setUser } from "./redux/user/userSlice";
import { useDispatch } from "react-redux";
import "./App.css";
import Router from "./route";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
