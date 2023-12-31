import React from "react";
import "./AlbumCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const AlbumCard = ({ album, id }) => {

  //matching currentAlbum photo for illuminating current album becase song list doesnt have album photo 
  const currentAlbumPhoto=useSelector((state)=>state.currentSong.album_photo);

  return (
    <Link
      to={{ pathname: `/album/${id}`, state: { album } }}
      style={{ textDecoration: "none" }} // Add this style to remove underline
    >
      <div
        className="card"
        style={{
          background:
            currentAlbumPhoto === album.album_photo ? "#376b2f" : "#282828",
        }}
      >
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
