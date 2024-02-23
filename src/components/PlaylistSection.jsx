

const PlaylistSection = ({ playlist, currentTrackIndex, setCurrentTrackIndex }) => {
    return (
        <div className='  w-full'>
            <h2 className='text-xl text-center py-2 '>Playlist</h2>
            <ul className='w-full max-h-80 overflow-y-scroll py-2 border-y border-neutral-300' >
                {playlist.map((track, index) => (
                    <li
                        className={`${currentTrackIndex === index ? "text-neutral-900 bg-neutral-300" : ""} cursor-pointer hover:text-neutral-900 rounded-md hover:bg-neutral-300 text-md p-1 w-full truncate`}
                        key={index}
                        onClick={() => setCurrentTrackIndex(index)}>
                        {track.fileName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlaylistSection