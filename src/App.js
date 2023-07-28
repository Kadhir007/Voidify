import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./component/home/Navbar";
import AlbumList from "./component/albums/AlbumList";
import SongsList from "./component/songs/SongsList";
import AudioPlayer from "./component/audio-player/AudioPlayer";
import AlbumInfo from "./component/albumInfo/AlbumInfo";
import About from "./component/about/About";
import { useSelector } from "react-redux";
const App = () => {
  const showPlayer=useSelector((state)=>state.showPlayer) ;
  
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
