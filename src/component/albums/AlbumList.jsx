import React from 'react'
import "./AlbumList.css"
import AlbumCard from './Albumcard'  
import { albums } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import store from '../../Reducers/Store'
import { SHOWPLAYER } from '../../Reducers/actions'
import { useEffect } from 'react'
const AlbumList = () => {
  
  useEffect(() => {
    store.dispatch({
      type: SHOWPLAYER,
    });
  }, []);
  return (
    
    <div className='container'>
    <div className='title-album'>
    <h1>
      Available Albums
    </h1>
    </div>
    <div className='grid-container'>
    <div className='album-list'>
      {albums.map((album, index) => <AlbumCard  key={index} album={album} id={index} />)}
    </div>
    </div>
    </div>
  )
}

export default AlbumList
