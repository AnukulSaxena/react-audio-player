import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PlaylistSection from "./PlaylistSection.jsx";
const AudioPlayer = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audioRef, setAudioRef] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const { playlist } = useSelector(state => state.playlist)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const lastTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
        setCurrentTrackIndex(lastTrackIndex);

        const lastTime = parseFloat(localStorage.getItem('currentTime')) || 0;
        setCurrentTime(lastTime);

        if (audioRef) {
            audioRef.currentTime = lastTime;
            setLoading(false)
        }
    }, [audioRef]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('currentTrackIndex', currentTrackIndex);
            localStorage.setItem('currentTime', currentTime);
        }
    }, [currentTrackIndex, currentTime]);

    const handleAudioEnded = () => {
        if (currentTrackIndex < playlist.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        }
    };

    return (
        <div className='flex items-center p-10 flex-col h-fit w-96 bg-neutral-900'>

            <PlaylistSection
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                setCurrentTrackIndex={setCurrentTrackIndex}
            />

            {playlist.length > 0 && (
                <div>
                    <h2
                        className='text-xl text-center py-5'
                    >Now Playing</h2>
                    <p>{playlist[currentTrackIndex].name}</p>
                    <audio
                        ref={(element) => setAudioRef(element)}
                        onEnded={handleAudioEnded}
                        onTimeUpdate={() => { setCurrentTime(audioRef.currentTime) }}
                        src={playlist[currentTrackIndex].url}
                        timeupdate={currentTime}
                        controls
                        autoPlay
                    ></audio>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer