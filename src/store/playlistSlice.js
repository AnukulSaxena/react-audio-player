import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    playlist: []
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylist: (state, actions) => {
            state.playlist = [...state.playlist, ...actions.payload]
        },
    },
})

export const { setPlaylist } = playlistSlice.actions

export default playlistSlice.reducer