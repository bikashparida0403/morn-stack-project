import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticatedseller: false,
  isLoadingseller: true,
  seller: null,
};

// Register Seller
export const registerSeller = createAsyncThunk(
  "/sellerauth/register",
  async (formData) => {
    console.log("now on redux"+formData)
    const response = await axios.post(
      "http://localhost:5000/api/sellerauth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Login Seller
export const loginSeller = createAsyncThunk(
  "/sellerauth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/sellerauth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Logout Seller
export const logoutSeller = createAsyncThunk(
  "/sellerauth/logout",
  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/sellerauth/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  }
);

// Check Seller Authentication
export const checkAuthSeller = createAsyncThunk(
  "/sellerauth/checkauth",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/sellerauth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    
    return response.data;
  }
);

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    setSeller: (state, action) => {
      console.log(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.isLoadingseller = true;
      })
      .addCase(registerSeller.fulfilled, (state) => {
        state.isLoadingseller = false;
        state.seller = null;
        state.isAuthenticatedseller = false;
      })
      .addCase(registerSeller.rejected, (state) => {
        state.isLoadingseller = false;
        state.seller = null;
        state.isAuthenticatedseller = false;
      })
      .addCase(loginSeller.pending, (state) => {
        state.isLoadingseller = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        console.log(action);
        state.isLoadingseller = false;
        state.seller = action.payload.success ? action.payload.seller : null;
        state.isAuthenticatedseller = action.payload.success;
      })
      .addCase(loginSeller.rejected, (state) => {
        state.isLoadingseller = false;
        state.seller = null;
        state.isAuthenticatedseller = false;
      })
      .addCase(checkAuthSeller.pending, (state) => {
        state.isLoadingseller = true;
      })
      .addCase(checkAuthSeller.fulfilled, (state, action) => {
        state.isLoadingseller = false;
        state.seller = action.payload.success ? action.payload.seller : null;
        state.isAuthenticatedseller = action.payload.success;
      })
      .addCase(checkAuthSeller.rejected, (state) => {
        state.isLoadingseller = false;
        state.seller = null;
        state.isAuthenticatedseller = false;
      })
      .addCase(logoutSeller.fulfilled, (state) => {
        state.isLoadingseller = false;
        state.seller = null;
        state.isAuthenticatedseller = false;
      });
  },
});

export const { setSeller } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
