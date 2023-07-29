import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

// import imageUrl from "../asserts/Cover.jpg";
import {
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsFillVolumeDownFill,
  BsFillVolumeOffFill,
} from "react-icons/bs";
import {
  BiSkipNextCircle,
  BiSkipPreviousCircle,
  BiShuffle,
} from "react-icons/bi";

import { useSelector } from "react-redux/es/hooks/useSelector";
import store from "../../Reducers/Store";
import {
  SET_ISPLAYING,
  PREV_SONG,
  NEXT_SONG,
  SHUFFLE,
} from "../../Reducers/actions";

const AudioPlayer = () => {
  const currentSong = useSelector((state) => state.currentSong);
  const isReallyPlaying = useSelector((state) => state.isPlaying);
 
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [isTextScrolling, setIsTextScrolling] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  
  //click play/pause or press space
  //store change
  const handlePlayPause = () => {
    store.dispatch({
      type: SET_ISPLAYING,
    });
  };
  const handleCanPlayThrough = () => {
    setIsAudioLoaded(true); // Mark the audio as loaded
    if (isReallyPlaying) {
      audioRef.current.play().catch((error) => {
        console.log("Failed to play the song:", error);
      });
    }
   
  };
  //play and pause player based on isReallyPlaying
  useEffect(() => {
    if (!isReallyPlaying) {
      audioRef.current.pause();
    } else {
      handleCanPlayThrough();
      audioRef.current.play().catch((error)=>{
        console.log("Failed to play the audio",error);
      });
    }
  }, [isReallyPlaying,currentSong, handleCanPlayThrough]);


  //seek progress bar
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    
    audioRef.current.currentTime = seekTime;
  };
  //diplay Time while playing
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  //previous song store state change
  const handlePrevious = () => {
    store.dispatch({
      type: PREV_SONG,
    });
    audioRef.current.autoplay = true;
  };
  //next song store state change
  const handleNext = () => {
    // console.log("playlist is ",playlist);
    
      store.dispatch({
        type: NEXT_SONG,
      });
    
  };
  //loop functionality
  const handleLoop = () => {
    // Handle loop logic here
    store.dispatch({
      type: SHUFFLE,
    });
  };
  //volume slider functionality
  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    audioRef.current.volume = volume;
  };

  //setting the volume to full on mobile devices because mobiles doesn't have access to volume slider
  useEffect(() => {
    
    const screenWidth = window.innerWidth;
    // Set the volume value to 1 if the screen width is less than or equal to 767 pixels
    if (screenWidth <= 767) {
      setVolume(1);
    }
    console.log(volume);
  }, []);

  // check for Event handlers
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Check if the pressed key is the space key
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      handlePlayPause();
    } else if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  //Scroll when song name is Long
  useEffect(() => {
    setIsTextScrolling(currentSong.song_name.length > 42);
  }, [currentSong]);

  return (
    <div className="audio-player slide-in-from-bottom">
      <div
        className="left-part"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="album-photo">
          <img src={currentSong.album_photo} alt="Album" />
        </div>
        <div className="songinfo">
          <div className="song-info-name">
            <h3
              className={`song-namee ${isTextScrolling ? "scroll-text" : ""}`}
            >
              {currentSong.song_name}
            </h3>
          </div>

          <div className="artist-name">
            <h4>{currentSong.artists_names.join(", ")}</h4>
          </div>
        </div>
      </div>
      <div className="middle-part">
        <div className="control-container">
          <div className="controls">
            <BiSkipPreviousCircle
              className="prev-button icon"
              onClick={handlePrevious}
            />
            {isReallyPlaying ? (
              <AiFillPauseCircle
                className="play-pause-button icon"
                onClick={handlePlayPause}
              />
            ) : (
              <AiFillPlayCircle
                className="play-pause-button icon"
                onClick={handlePlayPause}
              />
            )}
            <BiSkipNextCircle
              className="prev-button icon"
              onClick={handleNext}
            />
            <BiShuffle
              className="prev-button icon shuffle"
              onClick={handleLoop}
            />
          </div>

          <div className="progress-bar" >
            <div className="current-time-container" style={{widtth:'20px' ,marginRight:'14px'}}>
            <h2 style={{ color: "gray" }}>{`${Math.floor(
              currentTime / 60
            )}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}</h2>

            </div>
            <input
          
              type="range"
              value={currentTime}
              max={
                isAudioLoaded
                  ? currentSong.song_duration
                      .split(":")
                      .reduce(
                        (total, part, index) =>
                          total + parseInt(part) * (index === 0 ? 60 : 1),
                        0
                      )
                  : "0"
              }
              onChange={handleSeek}
              className="progress-bar-input"
            />
            <h2 style={{ color: "gray" }}>{currentSong.song_duration}</h2>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="volume-slider">
          {volume <= 0.1 && (
            <BsFillVolumeMuteFill
              className="speaker-icon"
              style={{ opacity: "0.3" }}
            />
          )}
          {volume > 0.1 && volume < 0.5 && (
            <BsFillVolumeOffFill className="speaker-icon" />
          )}
          {volume >= 0.5 && volume < 0.7 && (
            <BsFillVolumeDownFill className="speaker-icon" />
          )}
          {volume >= 0.7 && (
            <BsFillVolumeUpFill
              className="speaker-icon"
              style={{ color: "red" }}
            />
          )}

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider-input"
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.song_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        // autoPlay={isReallyPlaying}
        // onCanPlayThrough={handleCanPlayThrough}
      />
    </div>
  );
};
export default AudioPlayer;
