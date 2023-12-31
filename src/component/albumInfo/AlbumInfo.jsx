import React from "react";
import "./AlbumInfo.css";
import SongsList from "../songs/SongsList";
import { albums } from "../../firebase/firebase";
import { useParams } from "react-router-dom";

import { PiQueueFill } from "react-icons/pi";
import store from "../../Reducers/Store";
import {
  ADDTOQUEUE,
  CURRENT_SONG,
  SHUFFLE,
  SONGS_PLAYLIST,
} from "../../Reducers/actions";
const AlbumInfo = () => {
  const albumId = parseInt(useParams().albumId);
  const handlePlayClick = () => {
    store.dispatch({
      type: SONGS_PLAYLIST,
      payload: {
        albumId: albumId,
      },
    });

    store.dispatch({
      type: CURRENT_SONG,
      payload: {
        song: "album",
      },
    });
  };
  const handleAddToQueue = () => {
    store.dispatch({
      type:ADDTOQUEUE,
      payload:{
        queue:albums[albumId].songs,
      }
    })
  };
  const handleShuffleClick = () => {
    store.dispatch({
      type: SONGS_PLAYLIST,
      payload: {
        albumId: albumId,
      },
    });
    store.dispatch({
      type: SHUFFLE,
    });
    store.dispatch({
      type: CURRENT_SONG,
      payload: {
        song: "album",
      },
    });
  };

  return (
    <div className="album-info">
      <div className="album-container">
        <div className="album-photoo">
          <img
            src={albums[albumId].album_photo}
            alt="album "
            className="album-photo-image"
          />
        </div>
        <div className="album-details">
          <div className="albumm">
            <h1>{albums[albumId].album_name}</h1>
          </div>

          <div className="artistt">
            <h1>{albums[albumId].songs[0].artists_names[0]}</h1>
          </div>
          <div className="album-additional">
            <p>
              {`${albums[albumId].songs.length} `}
              {albums[albumId].songs.length > 1 ? "songs" : "song"} available
            </p>
          </div>
          <div className="album-buttons">
            <button
              className="album-info-buttons"
              onClick={() => handlePlayClick()}
            >
              Play
            </button>
            <button
              className="album-info-buttons"
              onClick={() => handleShuffleClick()}
            >
              Shuffle
            </button>
            <PiQueueFill
              onClick={handleAddToQueue}
              className="addtoqueue"
            />
          </div>
        </div>
      </div>
      <div className="song-list-container">
        <SongsList songs_info={albums[albumId].songs} makeStyle={true} />
      </div>
    </div>
  );
};

export default AlbumInfo;
