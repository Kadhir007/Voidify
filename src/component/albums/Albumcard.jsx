import React from "react";
import "./AlbumCard.css";
import { Link } from "react-router-dom";

const AlbumCard = ({ album,id }) => {
  return (
    <Link
    to={{ pathname: `/album/${id}`, state: { album } }}
    style={{ textDecoration: "none" }} // Add this style to remove underline
  >
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${album.album_photo})` }}
        ></div>
        <div className="content">
          <p className="heading">
            {album.album_name.length > 20
              ? album.album_name.substring(0, 27) + "...."
              : album.album_name}
          </p>
          <p className="author">{album.songs[0].artists_names[0]}</p>
        </div>
      </div>
    </Link> 
  );
};

export default AlbumCard;
