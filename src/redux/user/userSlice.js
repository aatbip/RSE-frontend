import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  token: "",
  username: "",
  loggedIn: false,
  loading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signin", data);
      toast.success(res.data.data.message);
      return res;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/registration", data);
      toast.success(res.data.data.status);
      return res;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      // set user from localstorage

      if (localStorage.getItem("token")) {
        state.loggedIn = true;
        state.token = JSON.parse(localStorage.getItem("token"));
        toast("You're logged in!");
      }
    },

    removeUser: (state) => {
      state.token = "";
      state.loggedIn = false;
      localStorage.clear();
    },
   
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.data.data.token;
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.data.data.token)
      );
      state.loggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
    },

    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [signup.rejected]: (state, action) => {
      // console.log(action)
      state.loading = false;
      state.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeUser, setUser,  } = userSlice.actions;

export default userSlice.reducer;
