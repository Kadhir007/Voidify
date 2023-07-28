import firebase from "firebase";
import { firebaseConfig } from "../API/apikey";
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.log("Firebase initiated");

const db = firebaseApp.firestore();
const collectionRef = db.collection("Musics-checked");
const albums = [];

// Fetch documents from the music collection
const fetchSongs = async () => {
  try {
    const snapshot = await collectionRef.get();
    const songs = snapshot.docs.map((doc) => doc.data());
    // Return the songs array from the function
    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return []; // Return an empty array in case of an error
  }
};

// Call the fetchSongs function and store the result in a variable
const songs = await fetchSongs();

//getting the albums array by destrcutnig songs to albums
songs.forEach((song) => {
  const {
    album_name,
    album_photo,
    song_name,
    artists_names,
    song_duration,
    song_url,
  } = song;

  const existingAlbum = albums.find((album) => album.album_name === album_name);

  if (existingAlbum) {
    existingAlbum.songs.push({
      song_name,
      artists_names: artists_names,
      song_duration,
      song_url,
      album_photo //just now added
    });
  } else {
    albums.push({
      album_name,
      album_photo,
      songs: [
        {
          album_photo, //just now added  
          song_name,
          artists_names: artists_names,
          song_duration,
          song_url,
        },
      ],
    });
  }
});
//sorting songs and albums in alphabeticorder
songs.sort((a, b) =>
  a.song_name.toLowerCase().localeCompare(b.song_name.toLowerCase())
);
albums.sort((a, b) =>
  a.album_name.toLowerCase().localeCompare(b.album_name.toLowerCase())
);
export { collectionRef, songs, albums };
export default db;
