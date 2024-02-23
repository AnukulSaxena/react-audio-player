import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playlist: [],
  uploading: false,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, actions) => {
      state.playlist = actions.payload;
    },
    setUploading: (state, actions) => {
      state.uploading = actions.payload;
    },
  },
});

export const { setPlaylist, setUploading } = playlistSlice.actions;

export default playlistSlice.reducer;
