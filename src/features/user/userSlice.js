import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  pastel: "pastel",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.pastel;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  //user: { username: 'badmin'},
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(state);
      console.log(action.payload);
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;

      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Déconnexion réussie");
    },
    toogleTheme: (state) => {
      const { pastel, dracula } = themes;
      state.theme = state.theme === pastel ? dracula : pastel;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);

    },
  },
});

export const { loginUser, logoutUser, toogleTheme } = userSlice.actions;

export default userSlice.reducer;
