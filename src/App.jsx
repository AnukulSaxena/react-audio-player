import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import { setPlaylist } from './store/playlistSlice.js';
import { useDispatch } from 'react-redux';

const App = () => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSongsFromLocalStorage = async () => {
      try {
        const allItems = Object.entries(localStorage);
        const uploadedSongs = allItems.filter(([key, value]) => key.startsWith('upload'));

        if (uploadedSongs.length > 0) {
          const parsedSongs = uploadedSongs.map(([key, value]) => JSON.parse(value));
          setSongs(parsedSongs);
          dispatch(setPlaylist(parsedSongs))
          console.log('Songs retrieved from localStorage:', parsedSongs);
        }
      } catch (error) {
        console.error('Error retrieving songs from localStorage:', error);
      }
    };

    getSongsFromLocalStorage();
  }, []);


  return (
    <div className='w-full min-h-screen text-neutral-200 relative'>
      <Header />
    </div>
  );
};

export default App;
