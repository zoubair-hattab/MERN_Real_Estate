import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    RequsetSingInStart: (state) => {
      state.loading = true;
    },
    RequsetSingInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    RequsetSingInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RequsetUpdateStart: (state) => {
      state.loading = true;
    },
    RequsetUpdateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    RequsetUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RequsetDeleteStart: (state) => {
      state.loading = true;
    },
    RequsetDeleteSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    RequsetDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RequsetSignOutStart: (state) => {
      state.loading = true;
    },
    RequsetSignOutSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    RequsetSignOutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  RequsetSingInStart,
  RequsetSingInSuccess,
  RequsetSingInFail,
  RequsetUpdateStart,
  RequsetUpdateSuccess,
  RequsetUpdateFail,
  RequsetDeleteStart,
  RequsetDeleteSuccess,
  RequsetDeleteFail,
  RequsetSignOutStart,
  RequsetSignOutSuccess,
  RequsetSignOutFail,
} = authReducer.actions;

export default authReducer.reducer;
