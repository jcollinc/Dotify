import SongCard from "./SongCard"


function Playlist ({setPlaylistId, playlists, userId, playlistId, currentPlaylistSongs, fetchPlaylistSongs, setVideoId, videoId}) {
    const selectedPlaylist = playlists.find(playlist => playlist.id === playlistId)
    
    const playlistSongs = currentPlaylistSongs?.map((song) => {
        
        const removeSong = () =>{
            console.log(song)
            fetch(`http://localhost:9292/users/${userId}/playlists/${selectedPlaylist.id}/${song.id}`,{
                method: "DELETE",
            })
            .then(resp => resp.json())
            .then(()=>{
                setPlaylistId(selectedPlaylist.id)
                fetchPlaylistSongs(selectedPlaylist)
            })
        }

        return (
            <div                    
              key={`${selectedPlaylist.id} ${song.id}`} 
            >
                <SongCard 
                    song={song}
                    setVideoId={setVideoId}
                    videoId={videoId}
                />
                <button className="remove-song-from-playlist" onClick={removeSong}>
                    Remove from playlist
                </button>
            </div>
        )
    })
        
    return(
        <div>
            <div className="playlist-container">
                {playlistId ? 
                    <div className="playlist-header">
                        <h1>{selectedPlaylist.name}</h1>
                        <h3>{`Playlist length: ${new Date(selectedPlaylist.duration * 1000).toISOString().substr(14, 5)}`}</h3>
                        <p>{`Last update: ${selectedPlaylist.last_update.match(/\d{4}-\d{2}-\d{2}/)}`}</p>
                    </div>
                : 
                    <div>
                        <h1>Error</h1>
                        <h3>Please try clicking on the playlist again</h3>
                    </div>
                }
            {playlistSongs}
            </div>
        </div>
    )
}

export default Playlist