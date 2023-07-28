import React from "react";
import "./SongsList.css";
import SongsCard from "./SongsCard";
import { songs } from "../../firebase/firebase";
import { SHOWPLAYER } from "../../Reducers/actions";
import store from "../../Reducers/Store";
import { useEffect } from "react";
const SongsList = ({ songs_info, makeStyle }) => {
  useEffect(() => {
    store.dispatch({
      type: SHOWPLAYER,
    });
  }, []);
  // Conditionally assign the songs_info array to the songs array
  const songsToRender = songs_info !== undefined ? songs_info : songs;

  return (
    <div className={makeStyle ? "song-list-important" : "song-list"}>
      <div className="title-song">
        <h1 style={{zIndex:'-1'}}  className={makeStyle ? "hide-heading" : ""}>Available Songs </h1>
      </div>
      {songsToRender.map((song, index) => (
        <SongsCard song={song} key={index} makeStyle={makeStyle} />
      ))}
    </div>
  );
};

export default SongsList;
