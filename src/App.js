import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./component/home/Navbar";
import AlbumList from "./component/albums/AlbumList";
import SongsList from "./component/songs/SongsList";
import AudioPlayer from "./component/audio-player/AudioPlayer";
import AlbumInfo from "./component/albumInfo/AlbumInfo";
import About from "./component/about/About";
import { useSelector } from "react-redux";
import {runCode} from "./component/audio-player/AudioDB"
const App = () => {
  const showPlayer=useSelector((state)=>state.showPlayer) ;
  useEffect(() => {
    // console.log("only once");
    runCode();
  }, []);
  return (
    
    <BrowserRouter>
      
      <Navbar />
      
      {showPlayer && <AudioPlayer />}
      
      <Routes>
      <Route path="/" exact element={<About />} />
        <Route path="/albums" exact element={<AlbumList />} />
        <Route path="/songs" exact element={<SongsList />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/album/:albumId" element={<AlbumInfo />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
