import { albums, songs } from "../firebase/firebase";
import {  CURRENT_SONG,NEXT_SONG,PREV_SONG ,SET_ISPLAYING,SHOWPLAYER,SHUFFLE,SONGS_PLAYLIST} from "./actions";

const initialState = {
  playlist:songs,
  currentSong: songs[0],
  nextSong: songs[1],
  prevSong: songs[songs.length - 1],
  isPlaying:false,
  showPlayer:false
};
const getSongIndex=(name,playlist)=>(playlist.findIndex((song)=>song.song_name===name))


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOWPLAYER:{
      return{
        ...state,
        showPlayer:true
      }
    }
      
    case SHUFFLE: {
      // Shuffle the array using the Fisher-Yates algorithm
      const shuffledPlaylist = [...state.playlist];
      for (let i = shuffledPlaylist.length - 1, r; i > 0; i--) {
        r = Math.floor(Math.random() * (i + 1));
        [shuffledPlaylist[i], shuffledPlaylist[r]] = [shuffledPlaylist[r], shuffledPlaylist[i]];
      }
      return {
        ...state,
        playlist: shuffledPlaylist,
      };
    }
    //pause and play action
    case SET_ISPLAYING:{
      return{
        ...state,
        isPlaying:!(state.isPlaying)
      }

    }
    // SOngs play while clicking song list 
    case CURRENT_SONG:{
      if(action.payload.song==="album"){
     
      return {
        ...state,
        currentSong:state.playlist[0],
        isPlaying:true,
        
      }
    }
   
    return{
      ...state,
      currentSong:action.payload.song,
      isPlaying:true,
     
    }
    }
    //NExt song in queue
    case NEXT_SONG:
      const nextIndex = (getSongIndex(state.currentSong.song_name,state.playlist) + 1) % state.playlist.length;
      if(state.playlist.length===1){
          return{
            ...state,
            isPlaying:false
          }
      }
      return {
        ...state,
        prevSong: state.currentSong,
        currentSong: state.playlist[nextIndex],
        isPlaying:true
      };
    case PREV_SONG:
      
      const previousIndexx = (getSongIndex(state.currentSong.song_name,state.playlist) - 1 + state.playlist.length) % state.playlist.length;
      // console.log(previousIndexx);
      return {
        ...state,
        nextSong: state.currentSong,
        currentSong: state.playlist[previousIndexx],
        isPlaying:true
        
      };
    case SONGS_PLAYLIST:{
      if (isNaN(action.payload.albumId)){
        return {
          ...state,
        playlist:songs,
        nextSong:null,
        prevSong:null,
        isPlaying:true
        }
      }
      return{
        ...state,
        playlist:albums[action.payload.albumId].songs,
       
      }
      
      
    }
   


    default:
      return state; 
  }
};

export default reducer;
