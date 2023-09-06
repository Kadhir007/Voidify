import { albums, songs } from "../firebase/firebase";
import {  CURRENT_SONG,NEXT_SONG,PREV_SONG ,SET_ISPLAYING,SHOWPLAYER,SHUFFLE,SONGS_PLAYLIST,LOOP,ADDTOQUEUE} from "./actions";

const initialState = {
  playlist:songs,
  currentSong: songs[0],
  isPlaying:false,
  showPlayer:false,
  loop:false,
  queue:[],
 
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
        loop:false,
      }
    }
   
    return{
      ...state,
      currentSong:action.payload.song,
      isPlaying:true,
      loop:false,
     
    }
    }
    //NExt song in queue also plays current song when loop is true
    case NEXT_SONG: {
      // Check if the current song is still in the playlist (including both playlist and queue)
      const currentIndex = state.playlist.findIndex(song => song.song_name === state.currentSong.song_name);
    
      if (currentIndex === -1) {
        // The current song is not in the updated playlist; adjust the next song accordingly
        // You can choose to play the next song in the queue or stop playback, depending on your app's logic
        return {
          ...state,
          isPlaying: false, // Stop playback or handle it as per your requirements
        };
      }
    
      // Calculate the index of the next song
      const nextIndex = (currentIndex + 1) % state.playlist.length;
    
      // Rest of your logic for looping and playback continuation
      if (state.loop) {
        return {
          ...state,
          currentSong: state.playlist[currentIndex], // Play the same song again in loop
          loop: false,
        };
      } else if (nextIndex === 0 && !state.loop) {
        // Stop playback when we reach the end of the playlist and not in loop mode
        return {
          ...state,
          isPlaying: false,
        };
      } else {
        return {
          ...state,
          currentSong: state.playlist[nextIndex], // Play the next song
          isPlaying: true,
        };
      }
    }

    case PREV_SONG:
      
      const previousIndexx = (getSongIndex(state.currentSong.song_name,state.playlist) - 1 + state.playlist.length) % state.playlist.length;
      // console.log(previousIndexx);
      return {

        ...state,
        currentSong: state.playlist[previousIndexx],
        isPlaying:true
        
      };

    case SONGS_PLAYLIST:{
      if (isNaN(action.payload.albumId)){
        return {
          ...state,
        playlist:songs,
        isPlaying:true
        }
      }
      return{
        ...state,
        playlist:albums[action.payload.albumId].songs,
      } 
    }

    //LOOP functionality note : PLaylist unchanged just altering index of the song
    case LOOP:{
      return {
        ...state,
        loop:!(state.loop),
      }
    }
    case ADDTOQUEUE: {
      const updatedQueue = [...state.queue, ...action.payload.queue];
    
      // Find the index of the current song in the playlist
      const currentIndex = state.playlist.findIndex(song => song.song_name === state.currentSong.song_name);
    
      // Split the existing playlist into three parts
      const playlistBeforeCurrentSong = state.playlist.slice(0, currentIndex + 1);
      const remainingPlaylist = state.playlist.slice(currentIndex + 1);
    
      // Construct the updated playlist with the desired order
      const updatedPlaylist = [...playlistBeforeCurrentSong, ...action.payload.queue, ...remainingPlaylist];
    
      return {
        ...state,
        queue: updatedQueue,
        playlist: updatedPlaylist,
      };
    }
    

    default:
      return state; 
  }
};

export default reducer;
