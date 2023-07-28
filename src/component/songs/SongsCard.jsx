import React from "react";
import { useParams } from "react-router-dom";

import { SONGS_PLAYLIST, CURRENT_SONG } from "../../Reducers/actions";
import store from "../../Reducers/Store";
import { useSelector } from "react-redux/es/hooks/useSelector";
const SongsCard = ({ song, makeStyle }) => {
  const albumId = parseInt(useParams().albumId);
  const currentSong = useSelector((state) => state.currentSong.song_name);
  
  const handleClick = () => {
    // console.log("album Id is ", albumId);
    store.dispatch({
      type: CURRENT_SONG,
      payload: {
        song: song,
      },
    });
    store.dispatch({
      type: SONGS_PLAYLIST,
      payload: {
        albumId: albumId,
      },
    });
  };
  return (
    <div
      className="song"
      onClick={handleClick}
      style={{
        backgroundColor:
          currentSong === song.song_name ?   "#376b2f":"#282828",
      }}
    >
      {!makeStyle && (
        <img src={song.album_photo} alt="album" className="imagee" />
      )}
      <div className="song-details">
        <h3 className="song-name">{song.song_name}</h3>
        <p className="album">{song.album_name}</p>
        <p className="artist">{song.artists_names.join(", ")}</p>
      </div>
      <div className="song-metadata">
        <p className="duration">Duration {song.song_duration}</p>
      </div>
    </div>
  );
};

export default SongsCard;
