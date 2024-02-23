import { configureStore } from '@reduxjs/toolkit'
import playlistSlice from './playlistSlice.js'

export const store = configureStore({
    reducer: {
        playlist: playlistSlice,
    },
})