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
      const { userData, token } = action.payload;
      const newUser = { ...userData, token: token};
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
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
