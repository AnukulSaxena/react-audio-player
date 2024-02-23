import React, { useEffect } from "react";
import Header from "./components/Header.jsx";
import { setPlaylist } from "./store/playlistSlice.js";
import { useDispatch } from "react-redux";
import AudioPlayer from "./components/AudioPlayer.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSongsFromLocalStorage = async () => {
      try {
        const allItems = Object.entries(localStorage);
        const uploadedSongs = allItems.filter(([key, value]) =>
          key.startsWith("upload"),
        );

        if (uploadedSongs.length > 0) {
          const parsedSongs = uploadedSongs.map(([key, value]) =>
            JSON.parse(value),
          );
          dispatch(setPlaylist(parsedSongs));
        }
      } catch (error) {
        console.error("Error retrieving songs from localStorage:", error);
      }
    };

    getSongsFromLocalStorage();
  }, []);

  return (
    <div className="w-full flex justify-center items-center bg-neutral-300 min-h-screen text-neutral-200">
      <Header />
      <AudioPlayer />
    </div>
  );
};

export default App;
