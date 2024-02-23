import { CloudinaryContext } from 'cloudinary-react';
import axios from 'axios'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../store/playlistSlice.js';

const cloudName = String(import.meta.env.VITE_APP_CLOUD_NAME);
const uploadPreset = String(import.meta.env.VITE_APP_UPLOAD_PRESET)
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

function UploaderModal({ setIsModalOpen }) {
  const dispatch = useDispatch();
  const { playlist } = useSelector(state => state.playlist)
  const [uploading, setUploading] = useState(false);

  function saveToStorage(key, data) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
        dispatch(setPlaylist([...playlist, data]))
        setIsModalOpen(false)
      } else {
        console.warn('Storage not available');
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileChange = async (event) => {
    try {
      const files = event.target.files;
      if (files.length < 1)
        return 0;

      setUploading(true);
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(cloudinaryUrl, formData);

      const uploadObject = {
        url: response.data.secure_url,
        fileName: file.name,
      };
      saveToStorage(`upload-${uploadObject.fileName}`, uploadObject);

    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false);
    }
  };

  return (
    <CloudinaryContext cloudName={cloudName}>
      <div className='fixed inset-0 flex justify-center bg-opacity-30 bg-black backdrop-blur-sm items-center'>
        <div className='w-96 flex-col flex rounded-sm h-40 bg-neutral-900 px-5'>
          <div className='w-full h-12 py-2 border-b border-neutral-200 flex justify-end'>
            <button
              className='bg-white text-lg px-3 text-neutral-900 rounded-sm font-mono'
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
          <div className='w-full h-full space-y-2 pt-5'>
            <input
              type="file"
              accept="audio/*"
              className='block w-full text-sm text-neutral-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-sm file:border-0
              file:text-sm file:font-semibold
              file:bg-neutral-50 file:text-neutral-700
              hover:file:bg-neutral-100'
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && <p className='text-center'>Uploading...</p>}

          </div>
        </div>
      </div>
    </CloudinaryContext>
  );
}

export default UploaderModal
